import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { LecturasPorContrato } from "src/Core/interfaces/eeh-invoice";
import { NotificationService } from '@shared/services/notification.service';
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
  selector: 'app-issued-invoices',
  templateUrl: './issued-invoices.component.html',
  styleUrls: ['./issued-invoices.component.css']
})
export class IssuedInvoicesComponent implements OnInit {
  FacturaIsVisible: boolean = false;
  dataInvoice!: LecturasPorContrato;
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceInterface[] = [];
  list: any[] = [];
  historicData: facturas[] = [];
  dataSource!: {chart:{}, data: [{}]};
  
  url = {
    id: 2,
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
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.GetRates();
  }

  
  updateTable(list: any){
    this.listOfData = [...this.listOfData,list];
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
  GetRates(){
    this.globalService.GetId(this.url.get, this.url.id).subscribe( 
      (result:any) => {
        console.log(result);
        this.listOfData = result;
      }
    );
  }
  // DeleteRate(Id: any){
  //   Id = Number(Id);
  //   this.globalService.Delete(this.url.delete, Id).subscribe(
  //     result => {
  //       console.log(result);
  //       this.GetRates();
  //     }
  //   );
  // }

    

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
          this.getHistoric(result.contrato.contratoId);
          this.FacturaIsVisible = true;
        }
        
      }
    );

  }

  getHistoric(contratoId:number){
    this.globalService.GetId( this.url.getHistorico, contratoId).subscribe(
      (result : any) => {
        if(result){
          this.historicData = result;
        }
      }
    );
    
  }

  CancelarFactura(invoicePosition: InvoiceInterface){
    let provider = {
      estado: 0
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

  Back(): void {
    this.FacturaIsVisible = false;
  }
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Contrato',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigoContrato.localeCompare(b.codigoContrato),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Cliente',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.codigoContrato.localeCompare(b.codigoContrato),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha generacion',
      sortOrder: 'descend',
      sortFn: null ,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Energia consumida',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.energiaConsumida - b.energiaConsumida,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Total',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.total - b.total,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];
}
