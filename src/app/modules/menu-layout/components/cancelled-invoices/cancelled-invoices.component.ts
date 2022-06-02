import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { LecturasPorContrato } from 'src/Core/interfaces/eeh-invoice';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';

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
@Component({
  selector: 'app-cancelled-invoices',
  templateUrl: './cancelled-invoices.component.html',
  styleUrls: ['./cancelled-invoices.component.css']
})
export class CancelledInvoicesComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceInterface[] = [];
  list: any[] = [];
  historicData: facturas[] = [];
  dataSource!: {chart:{}, data: [{}], contFacturas: number, promedioConsumo: number};
  dataInvoice!: LecturasPorContrato;
  FacturaIsVisible: boolean = false;
  url = {
    id: 0,
    get: 'get-invoices',
    post: 'facturas',
    delete: 'facturas',
    update: 'detalle-facturas', 
    getHistorico: "get-invoices-contract",
    generateFacturas: 'generate-invoice',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    console.log(this.list);
    
  }

  
  updateTable(list: any){
    this.listOfData = [...this.listOfData,list]
    
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
  Back(): void {
    this.FacturaIsVisible = false;
    this.dataSource = {chart:{
      caption: 'Historico de consumo por facturas generadas',
      subCaption: 'Energia activa consumida',
      xAxisName: 'Fecha',
      yAxisName: 'Consumo kWh',
      numberSuffix: 'K',
      theme: 'fusion'
    }, data: [{}], contFacturas: 0, promedioConsumo: 0};
  }
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  
  GetRates(){
    this.globalService.GetId(this.url.get, this.url.id).subscribe( 
      (result:any) => {
        console.log(result);
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }


  
  CancelarFactura(invoicePosition: InvoiceInterface){
    let provider = {
      estado: 2
    }
    console.log(provider);
    this.globalService.Patch(this.url.update, invoicePosition.facturaId, provider).subscribe(
      (result: any) => {
        console.log(result);
        
        if(result){
          this.notificationService.createMessage('error', 'No fue posible cancelar su factura 😞')
        }else{
          this.notificationService.createMessage( 'succes', 'Factura cancelada con exito. 😄');
        }
        
        this.GetRates();
        
      }
    );

  }


  GenerateInvoice(data: InvoiceInterface): void{
    
    let generateFacturaSchema = {
      fechaInicial: data.fechaInicio,
      fechaFinal:  data.fechaFin,
      facturaEEH: true,
      contratoId: data.codigoContrato
    }
    this.globalService.Post(this.url.generateFacturas, generateFacturaSchema).subscribe(
      (result: any) => {
        console.log(result);
        
        if(result){
          this.dataInvoice = result;
          this.getHistoric(result.contrato.contratoId, data);
          this.FacturaIsVisible = true;
          
          this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
        }else{
          this.notificationService.createMessage('error', 'No hay lecturas facturables 😓');
        }
          
        
      }
    );

  }

  getHistoric(contratoId:number, facturas : InvoiceInterface){
    this.globalService.GetId( this.url.getHistorico, contratoId).subscribe(
      (result : any) => {
        if(result){
          this.historicData = result;
          for(let data of this.historicData){
            if(Date.parse(data.fechaFin) <= Date.parse(this.dataInvoice.medidor[0].historico.fechaAnterior)){
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
                { label: '[' + formatDate(facturas.fechaInicio,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(facturas.fechaFin,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (facturas.energiaConsumida.toFixed(2)).toString() }],
            
              contFacturas: 0,
              promedioConsumo: 0  
            };
            
          }else{
            
            this.dataSource.data?.push(
              { label: '[' + formatDate(facturas.fechaInicio,'yyyy-MM-dd','en-US', 'GMT').toString() + ' - '  + formatDate(facturas.fechaFin,'yyyy-MM-dd','en-US', 'GMT').toString() + ' ]', value: (facturas.energiaConsumida.toFixed(2)).toString() }
              );
          }

              
          this.dataSource.contFacturas ++;
          this.dataSource.promedioConsumo += facturas.energiaConsumida;
          this.dataSource.promedioConsumo /= this.dataSource.contFacturas;

        }
      }
    );
    
  }

  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
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
      name: 'Fecha generacion',
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
      name: 'Total',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.total - b.total,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];
}
