import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";

@Component({
  selector: 'app-issued-invoices',
  templateUrl: './issued-invoices.component.html',
  styleUrls: ['./issued-invoices.component.css']
})
export class IssuedInvoicesComponent implements OnInit {
  FacturaIsVisible: boolean = false;
  dataInvoice!: InvoiceInterface;
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceInterface[] = [];
  list: any[] = [];
  
  url = {
    id: 2,
    get: 'get-invoices',
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
  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        console.log(result);
        this.GetRates();
      }
    );
  }

    

  GenerateInvoice(data: InvoiceInterface): void{
    this.dataInvoice = data;
    this.FacturaIsVisible = true;
  }

  CancelarFactura(invoicePosition: InvoiceInterface){
    let provider = {
      ... invoicePosition,
      descripcion: "actualizado",
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

  Back(): void {
    this.FacturaIsVisible = false;
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
