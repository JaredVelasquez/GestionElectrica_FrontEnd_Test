import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ActorInterface } from 'src/Core/interfaces/actors.interface';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit{
  isVisible = false;
  validateForm!: FormGroup;
  ListOfData!: ContractInterface[];
  ListOfClients: ActorInterface[] = [];

  url = {
    get: 'get-contracts',
    getClients: 'get-clients',
    post: 'contratos',
    delete: 'contratos',
    update: 'contratos',
  };

  constructor(
    private fb: FormBuilder,
    private globalService: EndPointGobalService
  ) { }

  ngOnInit(): void {
    this.GetRates();
    this.GetClients();
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
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        this.ListOfData = result;
        console.log(this.ListOfData);
        
      }
    );
  }

  GetClients(){
    this.globalService.Get(this.url.getClients).subscribe(
      (result: ActorInterface[] | any) => {
        this.ListOfClients = result;
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

  TablaUpdated(list: any){

    this.ListOfData.push(list);
    console.log(this.ListOfData);
    
      
    
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: 'ascend',
      sortFn: (a: ContractInterface, b: ContractInterface) => a.id - b.id,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Cliente',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Creacion',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.fechaCreacion.localeCompare(b.fechaCreacion),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
