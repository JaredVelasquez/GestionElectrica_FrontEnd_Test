import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { InvoiceTablesInterface } from 'src/Core/interfaces/invoices-tables.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";

@Component({
  selector: 'app-issued-invoices',
  templateUrl: './issued-invoices.component.html',
  styleUrls: ['./issued-invoices.component.css']
})
export class IssuedInvoicesComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceTablesInterface[] = [];
  list: any[] = [];
  
  url = {
    id: 1,
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
    
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    console.log(this.list);
    
  }

  
  updateTable(list: any){
    this.list = list;
    
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
  PostRate(){
    if (this.validateForm.valid) {
      const provider = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        observacion: this.validateForm.value.observacion,
      }
      console.log(provider);
      this.isVisible = false;
      this.globalService.Post(this.url.post, provider).subscribe(
        (result:any) => {
          if(result){
            this.GetRates();
            
          }
            console.log(result);
          
        }
      );
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

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

  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: InvoiceTablesInterface, b: InvoiceTablesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Contrato',
      sortOrder: 'descend',
      sortFn: (a: InvoiceTablesInterface, b: InvoiceTablesInterface) => a.contrato.localeCompare(b.contrato),
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Cliente',
      sortOrder: 'descend',
      sortFn: (a: InvoiceTablesInterface, b: InvoiceTablesInterface) => a.cliente.localeCompare(b.cliente),
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
      sortFn: (a: InvoiceTablesInterface, b: InvoiceTablesInterface) => a.energiaConsumida - b.energiaConsumida,
      sortDirections: ['descend', 'ascend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];
}
