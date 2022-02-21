import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MetersService } from "../../services/meters.service";
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';
import { MeterInterface } from 'src/Core/interfaces/model-meter.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';


interface DataItem {
  Codigo: string;
  Descripcion: string;
  Estado: boolean;
  Id: number;
  Modelo: string;
  Serie: string;
  Tipo: boolean;
}

interface DataItemTest {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css']
})
export class MetersComponent implements OnInit, OnChanges {
  Id!:number;
  urlMedidor: string = 'medidors';
  urlVirtualMeter: string = 'medidors';
  filterCodigo : Array<{text: string, value: any}>  = [];
  filterModel : Array<{text: string, value: any}> = [];
  filterSerie : Array<{text: string, value: any}> = [];
  listOfData: DataItem[] = [];
  listOfDataModal: DataItemTest[] = [];
  listOfDataVM: any[] = []; 
  property: Array<string> = [];
  options = [
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Fisico', value: 'Fisico' }
  ];
  validateForm!: FormGroup;
  isVisible:boolean = false;
  isVisible2:boolean = false;

  url: string = 'medidors';
  meter!: MeterInterface;
  options2 = [
    { label: 'Baja Tension', value: 'Baja Tension' },
    { label: 'Media Tension', value: 'Media Tension' }
  ];
  
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private metersService: MetersService
  ) { }

  ngOnInit(): void {
    this.GetMeters();
    this.GetVirtualMeters();
    
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      serie: ['', [Validators.required]],
      lecturaMax: ['', [Validators.required]],
      multiplicador: ['', [Validators.required]],
      //puntoMedicionId: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })

    
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`
        });
      }
      this.listOfDataModal = data;
    
    
    
  }

  ngOnChanges(): void {
    
  }
  
  GetMeters(){
    this.metersService.GetMeters().subscribe(
      (result:any) => {
        this.listOfData = result;
        
        if(this.listOfData){
          for(let i = 0 ; i < this.listOfData.length ; i++){
            
            this.filterModel.push({text: this.listOfData[i].Modelo+'', value: this.listOfData[i].Modelo});
            this.filterSerie.push({text: this.listOfData[i].Serie+'', value: this.listOfData[i].Serie})
            this.filterCodigo.push({text: this.listOfData[i].Codigo+'', value: this.listOfData[i].Codigo});
          }
          
          for(let property in this.listOfData){
            this.property.push(property);
          }

        }
      }
    );
  }

  GetVirtualMeters(){
    this.metersService.GetVirtualMeters().subscribe(
      (result:any) => {
        this.listOfDataVM = result;
      }
    );
  }

  
  DeleteMeter(Id: number){
    this.metersService.DeleteMeter(Id, this.urlMedidor).subscribe(
      result => {
        console.log(result);
        this.GetMeters();
      }
    );
  }
  
  DeleteVirtualMeter(Id: number){
    this.metersService.DeleteMeter(Id, this.urlVirtualMeter).subscribe(
      result => {
        console.log(result);
        this.GetMeters();
      }
    );
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

  submitForm(){
    
    
    
    if (this.validateForm.valid) {
      this.meter = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        modelo: this.validateForm.value.modelo,
        serie: this.validateForm.value.serie,
        lecturaMax: this.validateForm.value.lecturaMax,
        multiplicador: this.validateForm.value.multiplicador,
        puntoMedicionId: 1,
        observacion: this.validateForm.value.Observacion,
      }
      console.log(this.meter);
      this.isVisible = false;
      this.metersService.PostMeter(this.url, this.meter).subscribe(
        (result:any) => {
          if(result){
            
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

  

  
  showModal2(): void {
    this.isVisible2 = true;
  }

  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }



  
  listOfColumnsModal: ColumnItem[] = [
    {
      name: 'Medidor',
      sortOrder: 'descend',
      sortFn: (a: DataItemTest, b: DataItemTest) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Energia',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItemTest, b: DataItemTest) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: DataItemTest) => item.address.indexOf(address) !== -1
    }
  ];
  
  
  listOfColumns: ColumnItem[] = [
    {
      name: '#',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.Codigo.localeCompare(b.Codigo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: this.filterCodigo,
      filterFn: (list: string[], item: DataItem) => list.some(codigo => item.Codigo.indexOf(codigo) !== -1)
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Modelo',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.Modelo.localeCompare(b.Modelo),
      filterMultiple: false,
      listOfFilter: 
        this.filterModel
      ,
      filterFn: (address: string, item: DataItem) => item.Modelo.indexOf(address) !== -1
    },
    {
      name: 'Serie',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.Modelo.localeCompare(b.Serie),
      filterMultiple: false,
      listOfFilter: 
        this.filterSerie
      ,
      filterFn: (address: string, item: DataItem) => item.Serie.indexOf(address) !== -1
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: DataItem, b: DataItem) => Number(a.Tipo) - Number(b.Tipo),
      filterMultiple: false,
      listOfFilter: [
      ],
      filterFn: null
    }
  ];
}