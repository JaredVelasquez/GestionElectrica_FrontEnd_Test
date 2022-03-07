import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { InputParametersInterface } from 'src/Core/interfaces/input-parameters.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { Event } from '@angular/router';
import { ChargesInterface } from 'src/Core/interfaces/charges.interface';

@Component({
  selector: 'app-input-parameters',
  templateUrl: './input-parameters.component.html',
  styleUrls: ['./input-parameters.component.css']
})
export class InputParametersComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InputParametersInterface[] = [];
  dataPosition: any[] = [];
  ListOfCharges: ChargesInterface[] = [];

  url = {
    get: 'get-allparameters',
    getcargo: 'tipo-cargos',
    post: 'parametro-tarifas',
    delete: 'parametro-tarifas',
    update: '',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    this.GetCargos();
    
  }

  
  updateTable(list: any){
    this.listOfData.push(list);
    console.log(list);
    console.log(this.listOfData);
    
    
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
  GetRates(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        this.listOfData = result;
      }
    );
  }
  GetCargos(){
    this.globalService.Get(this.url.getcargo).subscribe(
      (result: any) => {
        this.ListOfCharges = result;
        console.log(result);
        
      }
    );
  }

  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        this.GetRates();
      }
    );
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.id - b.id,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Cargo',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.cargo - b.cargo,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicio',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.fechaInicio.localeCompare(b.fechaInicio),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Observacion',
      sortOrder: 'descend',
      sortFn: (a: InputParametersInterface, b: InputParametersInterface) => a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
