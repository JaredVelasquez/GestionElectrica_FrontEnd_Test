import { Component, OnInit, ViewChild } from '@angular/core';
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
import { formatDate } from '@angular/common';
import { LecturasPorContrato } from "src/Core/interfaces/eeh-invoice";
const moment = require('moment');

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
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
    private router: Router
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
  // GetRates(){
  //   this.globalService.GetId(this.url.get, this.url.id).subscribe( 
  //     (result:any) => {
  //       console.log(result);
  //       result.Id = Number(result.Id);
  //       this.listOfData = result;
  //     }
  //   );
  // }
  
  // GetMeters(){
  //   this.globalService.Get(this.url.getMeters).subscribe(
  //     (result:any) => {
  //       this.listOfMeters = result;

        
  //     }
  //   );
  // }
  
  // GetContratos(){
  //   this.globalService.GetId(this.url.getcontratosM, 1).subscribe( 
  //     (result:any) => {
  //       this.ListOfContractMeditors = result;
  //     }
  //   );
  // }

  // GetCargos(){
  //   this.globalService.GetId(this.url.getECharges, 1).subscribe( 
  //     (result:any) => {
  //       this.ListOfCharges = result;
  //       console.log(this.ListOfCharges);
        
  //     }
  //   );
  // }
  

  GenerateInvoice(data: LecturasPorContrato): void{
    this.dataInvoice = data;
    this.FacturaIsVisible = true;
  }

  // CancelarFactura(invoicePosition: InvoiceInterface){
  //   const {contratoMedidorId, codigo, fechaLectura, fechaVencimiento, fechaInicio, fechaFin, tipoConsumo, observacion} = invoicePosition;
  //   const provider = {
  //     ... {contratoMedidorId, codigo, fechaLectura, fechaVencimiento, fechaInicio, fechaFin, tipoConsumo, observacion},
  //     descripcion: "CANCELADA",
  //     fechaEmision: (new Date()).toISOString(),
  //     estado: 0,
  //   } 
  //   console.log(provider);
  //   this.globalService.Patch(this.url.update, invoicePosition.facturaId, provider).subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       this.GetRates();
        
  //     }
  //   );

  // }

  // EmitirFactura(invoicePosition: InvoiceInterface){

  //   const {contratoMedidorId, codigo, fechaLectura, fechaVencimiento, fechaInicio, fechaFin, tipoConsumo, observacion} = invoicePosition;
  //   const provider = {
  //     ... {contratoMedidorId, codigo, fechaLectura, fechaVencimiento, fechaInicio, fechaFin, tipoConsumo, observacion},
  //     descripcion: "Emitida",
  //     fechaEmision: (new Date()).toISOString(),
  //     estado: 2,
  //   } 

  //   console.log(provider);
    
  //   this.globalService.PutId(this.url.update, invoicePosition.facturaId, provider).subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       this.GetRates();
        
  //     }
  //   );

  // }

  GenerateInvoicesCleanForm(){
    this.generateInvoicesForm = this.fb.group({
      fecha: [ '', [Validators.required]],
      facturaEEH: [ '', [Validators.required]],
    });
  }

  submitForm(){

    let generateFacturaSchema = {
      fechaInicial: formatDate(this.generateInvoicesForm.value.fecha[0],'yyyy-MM-dd','en-US'),
      fechaFinal:  formatDate(this.generateInvoicesForm.value.fecha[1],'yyyy-MM-dd','en-US'),
      facturaEEH: this.generateInvoicesForm.value.facturaEEH,
    }
    console.log(generateFacturaSchema);
    
    
    this.globalService.Post(this.url.generateFacturas, generateFacturaSchema).subscribe(
      (result: any) => {
        this.listOfData = result;
        this.listOfData = [... this.listOfData];
        
      }
    );
    
    
  }

  // fullSchema(){
  //   this.newFacturas = {
  //     fechaInicial: (this.generateInvoicesForm.value.fecha[0]).toISOString().format('dd-m-yy'),
  //     fechaFinal: this.generateInvoicesForm.value.fecha[1].toISOString().format('dd-m-yy'),
  //     facturaEEH: this.generateInvoicesForm.value.facturaEEH
  //   }
  // }

  
  
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
      sortOrder: 'descend',
      sortFn: (a: InvoiceInterface, b: InvoiceInterface) => a.total - (b.total),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];
}
