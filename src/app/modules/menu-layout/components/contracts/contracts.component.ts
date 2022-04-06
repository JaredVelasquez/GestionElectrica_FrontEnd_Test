import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface, ContractSchema } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ActorInterface } from 'src/Core/interfaces/actors.interface';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit{
  isVisible = false;
  constractsIsDisable: boolean = false;
  IsLoading: boolean = false;
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
    this.GetContracts(1, false);
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
  GetClients(){
    this.globalService.GetId(this.url.getClients, 1).subscribe(
      (result: ActorInterface[] | any) => {
        this.ListOfClients = result;
      }
    
    );
  }

  
  GetContracts(estado: number, switched: boolean){
    if(switched){
      if((!this.constractsIsDisable) && estado === 0){
        this.constractsIsDisable = true;
      }else{
        this.constractsIsDisable = false;
      }
    }

    this.globalService.GetId(this.url.get, estado).subscribe(
      (result:any) => {
        this.ListOfData = result;
      }
    );
  }
  
  disableContract(constract: ContractInterface, estado : number){
    this.IsLoading = true;
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, constract.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetContracts(0, false);
          }else{
            this.GetContracts(1, false);
          }

        }
        
      this.IsLoading = false;
      }
    );
  }

  TablaUpdated(list: any){
    this.ListOfData = [...this.ListOfData,list]
  }



  
  listOfColumns: ColumnItem[] = [
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
    },
    {
      name: 'Vencimiento',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.fechaVenc.localeCompare(b.fechaVenc),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
