import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { MeterInterface } from 'src/Core/interfaces/meter.interface';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

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
  listOfData: MeterInterface[] = [];
  listOfDataModal: DataItemTest[] = [];
  listOfDataVM: any[] = []; 
  property: Array<string> = [];
  validateForm!: FormGroup;
  isVisible:boolean = false;
  url = {
    getMeters: 'get-meters',
    getVMeters: 'get-vmeters',
    get: 'medidors',
    post:'medidors',
    del:'medidors',
  }
  
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private globalService: EndPointGobalService
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
    this.globalService.Get(this.url.getMeters).subscribe(
      (result:any) => {
        this.listOfData = result;
        
        if(this.listOfData){
          for(let i = 0 ; i < this.listOfData.length ; i++){
            
            this.filterModel.push({text: this.listOfData[i].modeloMedidor+'', value: this.listOfData[i].modeloMedidor});
            this.filterSerie.push({text: this.listOfData[i].serieMedidor+'', value: this.listOfData[i].serieMedidor})
            this.filterCodigo.push({text: this.listOfData[i].codigoPM+'', value: this.listOfData[i].codigoPM});
          }
          
          for(let property in this.listOfData){
            this.property.push(property);
          }

        }
      }
    );
  }

  GetVirtualMeters(){
    this.globalService.Get(this.url.getVMeters).subscribe(
      (result:any) => {
        this.listOfDataVM = result;
      }
    );
  }

  
  DeleteMeter(Id: number){
    this.globalService.Delete(this.urlMedidor, Id).subscribe(
      result => {
        console.log(result);
        this.GetMeters();
      }
    );
  }
  
  DeleteVirtualMeter(Id: number){
    this.globalService.Delete(this.urlMedidor, Id).subscribe(
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
      let meter = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        modelo: this.validateForm.value.modelo,
        serie: this.validateForm.value.serie,
        lecturaMax: this.validateForm.value.lecturaMax,
        multiplicador: this.validateForm.value.multiplicador,
        puntoMedicionId: 1,
        observacion: this.validateForm.value.Observacion,
      }
      console.log(meter);
      this.isVisible = false;
      this.globalService.Post(this.url.post, meter).subscribe(
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

  
  listOfColumns: ColumnItem[] = [
    {
      name: '#',
      sortOrder: 'ascend',
      sortFn: (a: MeterInterface, b: MeterInterface) => a.idMedidor - b.idMedidor,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: MeterInterface, b: MeterInterface) => a.codigoPM.localeCompare(b.codigoPM),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: this.filterCodigo,
      filterFn: (list: string[], item: MeterInterface) => list.some(codigo => item.codigoPM.indexOf(codigo) !== -1)
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
      sortFn: (a: MeterInterface, b: MeterInterface) => a.modeloMedidor.localeCompare(b.modeloMedidor),
      filterMultiple: false,
      listOfFilter: 
        this.filterModel
      ,
      filterFn: (address: string, item: MeterInterface) => item.modeloMedidor.indexOf(address) !== -1
    },
    {
      name: 'Serie',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: MeterInterface, b: MeterInterface) => a.serieMedidor.localeCompare(b.serieMedidor),
      filterMultiple: false,
      listOfFilter: 
        this.filterSerie
      ,
      filterFn: (address: string, item: MeterInterface) => item.serieMedidor.indexOf(address) !== -1
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: MeterInterface, b: MeterInterface) => Number(a.tipoMedidor) - Number(b.tipoMedidor),
      filterMultiple: false,
      listOfFilter: [
      ],
      filterFn: null
    }
  ];
}