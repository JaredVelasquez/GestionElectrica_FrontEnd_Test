import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';
import { ContractMeterInterface } from 'src/Core/interfaces/contract-meter.interface';
import { EspecialChargesInterface } from 'src/Core/interfaces/especial-charges.interface';
import { endOfMonth } from 'date-fns';
import { Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { formatDate, NumberSymbol } from '@angular/common';
import { LecturasPorContrato } from "src/Core/interfaces/eeh-invoice";
import { NotificationService } from '@shared/services/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
export interface facturas{
  
  cliente: string,
  codigo: string,
  codigoContrato: string,
  contratoId: number
  energiaConsumida: number,
  estado: number
  fechaCancelacion: string,
  fechaEmision: string,
  fechaFin: string,
  fechaInicio: string,
  fechaLectura: string,
  fechaVencimiento: string,
  total: number
}

export interface model{
  contratoId:  number,
  codigo: string,
  fechaLectura:  string,
  fechaVencimiento: number,
  fechaInicio : string,
  fechaFin:  string,
  fechaEmision: string,
  energiaConsumida: number,
  total: number | undefined,
  estado: boolean,
} 

@Component({
  selector: 'app-generated-invoices',
  templateUrl: './generated-invoices.component.html',
  styleUrls: ['./generated-invoices.component.css']
})
export class GeneratedInvoicesComponent implements OnInit {
  FacturaIsVisible: boolean = false;
  dataInvoice!: LecturasPorContrato;
  isVisible = false;
  validateForm!: FormGroup;
  generateInvoicesForm!: FormGroup;
  listOfData: LecturasPorContrato[] = [];
  listOfMeters: MeterSchema[] = [];
  ListOfContractMeditors: ContractMeterInterface[] = [];
  ListOfCharges: EspecialChargesInterface[] = [];
  list: any[] = [];
  newFacturas!:any;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  UnDiaMLS = 86400000;
  hoy = Date.now();
  vencimiento: any;
  dataSource: {chart:{}, data: any[], contFacturas: number, promedioConsumo: number} =  {
    chart: {
      caption: 'Historico de consumo por facturas generadas',
      subCaption: 'Energia activa consumida',
      xAxisName: 'Fecha',
      yAxisName: 'Consumo kWh',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      ],
  
    contFacturas: 0,
    promedioConsumo: 0  
  };
  historicData: facturas[] = [];
  pipe = new DatePipe('en-US');
  isLoading: boolean = false;

  onChange(result: Date[]): void {
    this.dates = {
      from: result[0],
      to: result[1]
    }
    console.log(this.dates);
  }
  url = {
    id: 1,
    get: 'get-invoices',
    getMeters: 'get-meters',
    getcontratosM: 'get-c-meter',
    getECharges: 'get-especial-charges',
    post: 'facturas',
    delete: 'facturas',
    update: 'facturas',
    generateFacturas: 'generate-invoice',
    getHistorico: "get-invoices-contract",
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    // this.GetRates();
    // this.GetContratos();
    // this.GetCargos();
    this.GenerateInvoicesCleanForm();
    
    
  }

  
  // updateTable(list: any){
  //   this.GetRates();
    
  // }

  Back(): void {
    this.FacturaIsVisible = false;
    this.dataSource = {
      chart: {
        caption: 'Historico de consumo por facturas generadas',
        subCaption: 'Energia activa consumida',
        xAxisName: 'Fecha',
        yAxisName: 'Consumo kWh',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { }],
    
      contFacturas: 0,
      promedioConsumo: 0  
    };
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  
  GenerateInvoice(data: LecturasPorContrato): void{
    console.log('FACTURAS');
    console.log(data);
  
    
    
    this.dataInvoice = data;
    this.getHistoric(data.contrato.contratoId, data);
    this.FacturaIsVisible = true;
    console.log(this.dataSource);
    
  }

  getHistoric(contratoId: number, data: LecturasPorContrato){
    
    this.globalService.GetId( this.url.getHistorico, contratoId).subscribe(
      (result : any) => {
        if(result){
          this.historicData = result;
          for(let data of this.historicData){
            if(Date.parse(data.fechaFin) <= Date.parse(this.dataInvoice.medidor[0].historico.fechaAnterior)){
              console.log('fecha introducida en grafico');
              
              if(!this.dataSource){
                this.dataSource = {
                  chart: {
                    caption: 'Historico de consumo por facturas generadas',
                    subCaption: 'Energia activa consumida',
                    xAxisName: 'Fecha',
                    yAxisName: 'Consumo kWh',
                    numberSuffix: 'K',
                    theme: 'fusion'
                  },
                  data: [
                    { label: '[' + formatDate(data.fechaInicio,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(data.fechaFin,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (data.energiaConsumida.toFixed(2)).toString() }],
                
                  contFacturas: 0,
                  promedioConsumo: 0  
                };
                
              }else{
                
                this.dataSource.data?.push(
                  { label: '[' + formatDate(data.fechaInicio,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(data.fechaFin,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (data.energiaConsumida.toFixed(2)).toString() }
                  );
              }
  
              
              this.dataSource.contFacturas ++;
              this.dataSource.promedioConsumo += data.energiaConsumida;
  
            }

          }

          
          
          if(!this.dataSource.data){
            this.dataSource = {
              chart: {
                caption: 'Historico de consumo por facturas generadas',
                subCaption: 'Energia activa consumida',
                xAxisName: 'Fecha',
                yAxisName: 'Consumo kWh',
                numberSuffix: 'K',
                theme: 'fusion'
              },
              data: [
                { label: '[' + formatDate(data.medidor[0].historico.fechaAnterior,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(data.medidor[0].historico.fechaActual,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (data.totalLecturaActivaAjustada.toFixed(2)).toString() }],

              contFacturas: 0,
              promedioConsumo: 0  
            };
            this.dataSource.contFacturas ++;
            this.dataSource.promedioConsumo += data.totalLecturaActivaAjustada;
            this.dataSource.promedioConsumo /= this.dataSource.contFacturas;
            
          }else{
            
          this.dataSource.data?.push(
            { label: '[' + formatDate(data.medidor[0].historico.fechaAnterior,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(data.medidor[0].historico.fechaActual,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (data.totalLecturaActivaAjustada.toFixed(2)).toString() }
            );
            this.dataSource.contFacturas ++;
            this.dataSource.promedioConsumo += data.totalLecturaActivaAjustada;
            this.dataSource.promedioConsumo /= this.dataSource.contFacturas;

          }

        


        }
      }
    );
    
  }


  EmitirFactura(invoicePosition: LecturasPorContrato){
    console.log(invoicePosition);
    
    const provider = {
      contratoId:  invoicePosition.contrato.contratoId,
      codigo:  formatDate((new Date()).toISOString(), 'yyyy-MM-dd','en-US', 'GMT') + ' - FA#',
      fechaLectura:  invoicePosition.medidor[0].historico.fechaActual,
      fechaVencimiento:  (this.UnDiaMLS * invoicePosition.contrato.diasDisponibles) + this.hoy,
      fechaInicio : invoicePosition.medidor[0].historico.fechaAnterior,
      fechaFin:  invoicePosition.medidor[0].historico.fechaActual,
      fechaEmision: (new Date()).toISOString(),
      energiaConsumida: invoicePosition.totalLecturaActivaAjustada,
      total: invoicePosition.cargo? invoicePosition.cargo[invoicePosition.cargo.length - 1].valorAjustado : 0,
      estado: true,
    } 

    console.log(provider);
    
    this.globalService.Post(this.url.post, provider).subscribe(
      (result: any) => {
        if(result){
          if(result.error){
            this.notificationService.createMessage('error', result.error)
          }else{
            this.notificationService.createMessage( 'succes', 'Factura emitida con exito. 😄');
          }
        } 
        
      }
    );

  }

  EmitAll(){
    this.isLoading = true;
    this.nzMessageService
      .loading('Action in progress', { nzPauseOnHover: this.isLoading })
      .onClose!.pipe(
        concatMap(() => this.nzMessageService.success('Loading finished', { nzDuration: 2500 }).onClose!),
        concatMap(() => this.nzMessageService.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
    for(let i = 0; i < this.listOfData.length; i++){

      let provider: model = {
        contratoId:  this.listOfData[i].contrato.contratoId,
        codigo:   this.pipe.transform(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss', '-0600') + ' - FA#',
        fechaLectura:  this.listOfData[i].medidor[0].historico.fechaActual,
        fechaVencimiento:  (this.UnDiaMLS * this.listOfData[i].contrato.diasDisponibles) + this.hoy,
        fechaInicio : this.listOfData[i].medidor[0].historico.fechaAnterior,
        fechaFin:  this.listOfData[i].medidor[0].historico.fechaActual,
        fechaEmision: (new Date()).toISOString(),
        energiaConsumida: this.listOfData[i].totalLecturaActivaAjustada,
        total: this.listOfData[i].cargo ? this.listOfData[i].cargo[this.listOfData[i].cargo.length - 1].valorAjustado : 0,
        estado: true,
      } 

      this.globalService.Post(this.url.post, provider).subscribe(
        (result: any) => {
          console.log(result);
          
        }
      );

      if(i+1 == this.listOfData.length){
        this.isLoading = false;
      }
      
    }
  }

  GenerateInvoicesCleanForm(){
    this.generateInvoicesForm = this.fb.group({
      fecha: [ '', [Validators.required]],
      facturaEEH: [ '', [Validators.required]],
    });
  }

  submitForm(){
    let isLoading = true;
    this.nzMessageService
      .loading('Action in progress', { nzPauseOnHover:  isLoading})
      .onClose!.pipe(
        concatMap(() => this.nzMessageService.success('Loading finished', { nzDuration: 1000 }).onClose!),
        concatMap(() => this.nzMessageService.info('Loading finished', { nzDuration: 1000 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
    let generateFacturaSchema = {
      fechaInicial: this.pipe.transform(this.generateInvoicesForm.value.fecha[0], 'yyyy-MM-dd HH:mm:ss', '-0600'),
      fechaFinal: this.pipe.transform(this.generateInvoicesForm.value.fecha[1], 'yyyy-MM-dd HH:mm:ss', '-0600'),
      facturaEEH: this.generateInvoicesForm.value.facturaEEH,
    }
    console.log(generateFacturaSchema);
    
    
    this.globalService.Post(this.url.generateFacturas, generateFacturaSchema).subscribe(
      (result: any) => {
        console.log(result);
        
        if(result){
          this.listOfData = result;
          this.listOfData = [... this.listOfData];

          this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
          isLoading = false;
        }else{
          this.notificationService.createMessage('error', 'La accion fallo 😓');
          isLoading = false;
        }
      }
    );
    
    
  }

  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Contrato',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Cliente',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: null,
      sortFn: null ,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: null,
      sortFn: null ,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Energia consumida (kWh)',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.energiaConsumida - b.energiaConsumida,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Total a pagar',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.total - (b.total),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];
}
