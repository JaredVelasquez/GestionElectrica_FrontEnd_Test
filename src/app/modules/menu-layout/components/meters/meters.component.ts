import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { MeterInterface, MeterSchema } from 'src/Core/interfaces/meter.interface';
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
  listOfData: MeterInterface[] = [];
  listOfDataVM: any [] = [];
  meterIsActive: boolean = false;
  vmeterIsActive: boolean = false;
  
  url = {
    getMeters: 'get-meters',
    getVMeters: 'get-vmeters',
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
    this.GetVirtualMeters(1, false);
  }

  ngOnChanges(): void {

  }

  // GetMeters(){
  //   this.globalService.Get(this.url.getMeters).subscribe(
  //     (result:any) => {
  //       this.listOfData = result;

  //       if(this.listOfData){
  //         for(let i = 0 ; i < this.listOfData.length ; i++){

  //           this.filterModel.push({text: this.listOfData[i].modeloMedidor+'', value: this.listOfData[i].modeloMedidor});
  //           this.filterSerie.push({text: this.listOfData[i].serieMedidor+'', value: this.listOfData[i].serieMedidor})
  //           this.filterCodigo.push({text: this.listOfData[i].codigoPM+'', value: this.listOfData[i].codigoPM});
  //         }

  //         for(let property in this.listOfData){
  //           this.property.push(property);
  //         }

  //       }
  //     }
  //   );
  // }

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
        this.listOfData = result;
      }
    );
  }
  
  GetVirtualMeters(estado: number, switched: boolean){
    // if(switched){
    //   if((!this.vmeterIsActive) && estado === 0){
    //     this.vmeterIsActive = true;
    //   }else{
    //     this.vmeterIsActive = false;
    //   }
    // }

    // this.globalService.GetId(this.url.getVMeters, estado).subscribe(
    //   (result:any) => {
    //     this.listOfDataVM = result;
    //   }
    // );
  }

 
  // disableVirtualMeter(vmeter: any, estado : number){
  //   let newEstado = Boolean(estado);
  //   this.globalService.Patch(this.url.update, zone.id, {estado: newEstado}).subscribe(
  //     result => {
  //       if(!result){
  //         if(estado === 1){
  //           this.GetZones(0, false);
  //         }else{
  //           this.GetZones(1, false);
  //         }

  //       }
  //     }
  //   );
  // } 
  disableMeter(meter: MeterInterface, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, meter.idMedidor, {estado: newEstado}).subscribe(
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
      listOfFilter: [],
      filterFn: (list: string[], item: MeterInterface) => list.some(codigo => item.codigoPM.indexOf(codigo) !== -1)
    },
    {
      name: 'Source ID',
      sortOrder: null,
      sortFn: (a: MeterInterface, b: MeterInterface) => a.sourceId.localeCompare(b.sourceId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
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
      listOfFilter: [],
      filterFn: (address: string, item: MeterInterface) => item.modeloMedidor.indexOf(address) !== -1
    },
    {
      name: 'Serie',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: MeterInterface, b: MeterInterface) => a.serieMedidor.localeCompare(b.serieMedidor),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: (address: string, item: MeterInterface) => item.serieMedidor.indexOf(address) !== -1
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: MeterInterface, b: MeterInterface) => Number(a.tipoMedidor) - Number(b.tipoMedidor),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
  ];
}