import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';
import { MeasurePointSchema } from 'src/Core/interfaces/measure-point.interface';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ManualInterface, ManualSchema } from 'src/Core/interfaces/manualRegister.interface';
import { VariableSchema } from 'src/Core/interfaces/variable.interface';
import { VirtualMeterInterface } from 'src/Core/interfaces/virtual-meter.interface';


@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css']
})
export class MetersComponent implements OnInit, OnChanges {
  listOfData: MeterSchema[] = [];
  listOfDataVM: VirtualMeterInterface [] = [];
  meterIsActive: boolean = false;
  vmeterIsActive: boolean = false;
  listOfMPoinst: MeasurePointSchema[] = [];
  listOfManualRegister: MeterSchema[] = [];
  listOfVariables: VariableSchema[] = [];
  listOfManualRegisters: ManualInterface[] = [];
  
  url = {
    getMeters: 'get-meters',
    getVMetersDetail: 'get-vmeters-detail',
    getVMeters: 'get-vmeters',
    getVMetersmodel: 'medidor-virtuals',
    getMeasurePoints: 'punto-medicions',
    getVariables: "variables",
    get: 'medidors',
    post:'medidors',
    delete:'medidors',
    update: 'medidors'
  }

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private globalService: EndPointGobalService
  ) { }

  ngOnInit(): void {
    this.GetMeters(1, false);
    this.GetVirtualMeters();
    this.GetMeasurePoint();
    this.GetVariables();
    console.log(this.listOfData);
    
  }
 ngOnChanges(changes: SimpleChanges): void {
   console.log(this.listOfData );
   
   
 }
  updateTable(list: MeterSchema){
    this.listOfData = [...this.listOfData,list];
  }

  GetMeters(estado: number, switched: boolean){
    if(switched){
      if((!this.meterIsActive) && estado === 0){
        this.meterIsActive = true;
      }else{
        this.meterIsActive = false;
      }
    }

    this.globalService.GetId(this.url.getMeters, estado).subscribe(
      (result:any) => {
        this.listOfData =  result;
        console.log(this.listOfData);
        
      }
    );
    
  }

  GetMeasurePoint(): void{
    this.globalService.Get(this.url.getMeasurePoints).subscribe(
      (result:any) => {
        this.listOfMPoinst = result;
      }
    );
  }

  GetVirtualMeters(){
    this.globalService.Get(this.url.getVMetersDetail).subscribe(
      (result:any) => {
        this.listOfDataVM = result;
      }
    );
  }

  GetManualSchemas(){
    this.listOfManualRegister.length = 0;
    for(let i = 0; i < this.listOfData.length; i++){
      if(this.listOfData[i].registroDatos){
        this.listOfManualRegister = [... this.listOfManualRegister,this.listOfData[i]];
      }
    }
    this.listOfData.length = 0;
    this.listOfData = [... this.listOfManualRegister];
  }

  GetVariables(){
    this.globalService.Get(this.url.getVariables).subscribe(
      (result:any) => {
        this.listOfVariables = result;
      }
    );
  }

  disableMeter(meter: MeterSchema, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, meter.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetMeters(0, false);
          }else{
            this.GetMeters(1, false);
          }

        }
      }
    );
  }

  listOfColumns: ColumnItem[] = [
    {
      name: '#',
      sortOrder: 'ascend',
      sortFn: (a: MeterSchema, b: MeterSchema) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: MeterSchema, b: MeterSchema) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: MeterSchema) => list.some(codigo => item.codigo.indexOf(codigo) !== -1)
    },
    {
      name: 'Source ID',
      sortOrder: null,
      sortFn: (a: MeterSchema, b: MeterSchema) => a.sourceId.localeCompare(b.sourceId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: MeterSchema) => list.some(codigo => item.sourceId.indexOf(codigo) !== -1)
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
      sortFn: (a: MeterSchema, b: MeterSchema) => a.modelo.localeCompare(b.modelo),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: (address: string, item: MeterSchema) => item.modelo.indexOf(address) !== -1
    },
    {
      name: 'Serie',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: MeterSchema, b: MeterSchema) => a.serie.localeCompare(b.serie),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: (address: string, item: MeterSchema) => item.serie.indexOf(address) !== -1
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
  ];
}