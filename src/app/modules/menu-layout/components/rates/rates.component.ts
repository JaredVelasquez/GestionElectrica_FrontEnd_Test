import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ZoneShema } from 'src/Core/interfaces/zones.interface';
import { InputParametersInterface, InputParamSchema } from 'src/Core/interfaces/input-parameters.interface';



@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit{
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: RatesInterface[] = [];
  listOfParamRelation: InputParametersInterface[] = [];
  listOfGeneralParams: InputParamSchema[] = [];
  ratesIsActive: boolean = false;
  dataPosition: any[] = [];
  
  url = {
    get: 'get-rates',
    getParams: 'get-parameter',
    getAllParams: 'get-allparameters',
    post: 'tarifas',
    delete: 'tarifas',
    update: 'tarifas',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates(1, false);
    this.GetParams();
    this.GetGeneralParams();
    
  }

  
  updateTable(list: any){
    this.listOfData = [... this.listOfData, list];
  }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  GetParams(){
    this.globalService.Get(this.url.getParams).subscribe(
      (result:any) => {
        
        this.listOfParamRelation = result;
      }
    );
  }

  GetGeneralParams(){
    this.globalService.GetId(this.url.getAllParams, 1).subscribe(
      (result:any) => {
        console.log(result);
        
        this.listOfGeneralParams = result;
      }
    );
  }
  GetRates(estado: number, switched: boolean){
    if(switched){
      if((!this.ratesIsActive) && estado === 0){
        this.ratesIsActive = true;
      }else{
        this.ratesIsActive = false;
      }
    }

    this.globalService.GetId(this.url.get, estado).subscribe(
      (result:any) => {
        this.listOfData = result;
      }
    );
  }


  disableRate(meter: RatesInterface, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, meter.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetRates(0, false);
          }else{
            this.GetRates(1, false);
          }

        }
      }
    );
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Observacion',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.observacion.localeCompare(b.observacion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
