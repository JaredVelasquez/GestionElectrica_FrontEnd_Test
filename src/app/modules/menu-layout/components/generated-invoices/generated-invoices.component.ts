import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';
import { MeterInterface } from 'src/Core/interfaces/meter.interface';
import { ContractMeterInterface } from 'src/Core/interfaces/contract-meter.interface';
import { EspecialChargesInterface } from 'src/Core/interfaces/especial-charges.interface';

@Component({
  selector: 'app-generated-invoices',
  templateUrl: './generated-invoices.component.html',
  styleUrls: ['./generated-invoices.component.css']
})
export class GeneratedInvoicesComponent implements OnInit {
  FacturaIsVisible: boolean = false;
  dataInvoice!: InvoiceInterface;
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceInterface[] = [];
  listOfMeters: MeterInterface[] = [];
  ListOfContractMeditors: ContractMeterInterface[] = [];
  ListOfCharges: EspecialChargesInterface[] = [];
  list: any[] = [];
  
  url = {
    id: 1,
    get: 'get-invoices',
    getMeters: 'get-meters',
    getcontratosM: 'get-c-meter',
    getECharges: 'get-especial-charges',
    post: 'facturas',
    delete: 'facturas',
    update: 'facturas',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    this.GetContratos();
    this.GetCargos();
    
    
  }

  
  updateTable(list: any){
    this.GetRates();
    
  }

  GenerateInvoice(data: InvoiceInterface): void{
    this.dataInvoice = data;
    this.FacturaIsVisible = true;
  }

  Back(): void {
    this.FacturaIsVisible = false;
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
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }
  
  GetMeters(){
    this.globalService.Get(this.url.getMeters).subscribe(
      (result:any) => {
        this.listOfMeters = result;

        
      }
    );
  }
  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        console.log(result);
        this.GetRates();
      }
    );
  }
  
  GetContratos(){
    this.globalService.GetId(this.url.getcontratosM, 1).subscribe( 
      (result:any) => {
        this.ListOfContractMeditors = result;
      }
    );
  }
  GetCargos(){
    this.globalService.Get(this.url.getECharges).subscribe( 
      (result:any) => {
        this.ListOfCharges = result;
        console.log(this.ListOfCharges);
        
      }
    );
  }
  CancelarFactura(invoicePosition: InvoiceInterface){
    let provider = {
      contratoMedidorId: invoicePosition.contratoMedidorId,
      descripcion: "actualizado",
      codigo: invoicePosition.codigo,
      fechaLectura: invoicePosition.fechaLectura,
      fechaVencimiento: invoicePosition.fechaVencimiento,
      fechaInicio: invoicePosition.fechaInicio,
      fechaFin: invoicePosition.fechaFin,
      tipoConsumo: invoicePosition.tipoConsumo,
      observacion: invoicePosition.observacion,
      estado: 0,
    }
    console.log(provider);
    this.globalService.PutId(this.url.update, invoicePosition.facturaId, provider).subscribe(
      (result: any) => {
        console.log(result);
        this.GetRates();
        
      }
    );

  }

  EmitirFactura(invoicePosition: InvoiceInterface){
    let provider = {
      contratoMedidorId: invoicePosition.contratoMedidorId,
      descripcion: "actualizado",
      codigo: invoicePosition.codigo,
      fechaLectura: invoicePosition.fechaLectura,
      fechaEmision: (new Date()).toISOString(),
      fechaVencimiento: invoicePosition.fechaVencimiento,
      fechaInicio: invoicePosition.fechaInicio,
      fechaFin: invoicePosition.fechaFin,
      tipoConsumo: invoicePosition.tipoConsumo,
      observacion: invoicePosition.observacion,
      estado: 2,
    }
    console.log(provider);
    
    this.globalService.PutId(this.url.update, invoicePosition.facturaId, provider).subscribe(
      (result: any) => {
        console.log(result);
        this.GetRates();
        
      }
    );

  }


  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.detalleFacturaId - b.detalleFacturaId,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
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
      name: 'Energia consumida',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.energiaConsumida - b.energiaConsumida,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Total a pagar',
      sortOrder: null,
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.total - (b.total),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];
}
