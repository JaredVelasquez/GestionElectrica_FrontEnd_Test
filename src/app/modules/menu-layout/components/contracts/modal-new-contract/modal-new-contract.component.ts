import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface, ContractSchema } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ActorInterface } from 'src/Core/interfaces/actors.interface';
import { toBoolean, toNumber } from 'ng-zorro-antd/core/util';
import { endOfMonth } from 'date-fns';



@Component({
  selector: 'app-modal-new-contract',
  templateUrl: './modal-new-contract.component.html',
  styleUrls: ['./modal-new-contract.component.css']
})
export class ModalNewContractComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  newContract!: ContractSchema;
  @Input() dataPosition!: ContractInterface;
  @Input() ListOfClients: ActorInterface[] = [];
  @Output() DataUpdated : EventEmitter<ContractInterface> = new EventEmitter<ContractInterface>();
  ListOfClientsAux: ActorInterface[] = [];
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  
  url = {
    get: 'get-contracts',
    post: 'contratos',
    delete: 'contratos',
    update: 'contratos',
  };
  

  constructor(
    private fb: FormBuilder,
    private globalService: EndPointGobalService
    ) { }

  ngOnInit(): void {
    this.cleanForm();
  }

  showModal(): void {
    this.isVisible = true;
    console.log(this.dataPosition);
    
    if(this.dataPosition){
      this.filterActores(this.dataPosition.clasificacion);
      this.editableForm();
    }else{
      this.cleanForm();
      
    }
  }

  editableForm(){
    this.validateForm = this.fb.group({
      codigo: [ this.dataPosition.codigo , [Validators.required]],
      clasificacion: [ this.dataPosition.clasificacion, [Validators.required]],
      actorId: [ this.dataPosition.actorId, [Validators.required]],
      fecha: [ [this.dataPosition.fechaCreacion.toString(), this.dataPosition.fechaVenc.toString()], [Validators.required]],
      diaGeneracion: [ this.dataPosition.diaGeneracion, [Validators.required]],
      diasDisponibles: [ this.dataPosition.diasDisponibles, [Validators.required]],
      exportacion: [ this.dataPosition.exportacion, [Validators.required]],
      descripcion: [ this.dataPosition.descripcion, [Validators.required]],
      observacion: [ this.dataPosition.observacion, [Validators.required]],
    })
  }

  cleanForm(){
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      clasificacion: ['', [Validators.required]],
      actorId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      diaGeneracion: ['', [Validators.required]],
      diasDisponibles: ['', [Validators.required]],
      exportacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
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
    if(!this.dataPosition){
      this.submitPostForm();
    }else{
      this.submitUpdateForm();
      console.log(this.dataPosition);
      
    }

  }
  submitPostForm(): void{
    if (this.validateForm.valid) {
      this.fullSchema();

      this.globalService.Post(this.url.post, this.newContract).subscribe(
        (result:any) => { 
          console.log(result);
          if(result){
            this.DataUpdated.emit(result);
            this.isVisible = false;

          }
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

  submitUpdateForm(){
    if (this.validateForm.valid) {
      this.fullSchema();

      this.globalService.PutId( this.url.post, this.dataPosition.id , this.newContract).subscribe(
        (result:any) => {
          if(!result){
            this.updateMainTable(this.newContract);
            this.isVisible = false;
          }
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

  updateMainTable(data: ContractSchema){
    
    for(let i=0; i<this.ListOfClients.length ; i++){
      if(this.ListOfClients[i].id == this.newContract.actorId){
        this.dataPosition.nombre = this.ListOfClients[i].nombre;
        
      }
    }
    this.dataPosition.codigo = this.newContract.codigo;
    this.dataPosition.descripcion = this.newContract.descripcion;
    this.dataPosition.fechaCreacion = this.newContract.fechaCreacion;
    this.dataPosition.fechaVenc = this.newContract.fechaVenc;
    this.dataPosition.exportacion = this.newContract.exportacion;
    this.dataPosition.clasificacion = this.newContract.clasificacion;
    this.dataPosition.actorId = this.newContract.actorId;
    this.dataPosition.diaGeneracion = this.newContract.diaGeneracion;
    this.dataPosition.diasDisponibles = this.newContract.diasDisponibles;
    this.dataPosition.observacion = this.newContract.observacion;
  }

  fullSchema(){
    const {codigo, clasificacion, actorId, diaGeneracion, diasDisponibles, exportacion, descripcion, observacion} = this.validateForm.value;

    this.newContract = {
      ... {codigo, clasificacion, actorId, diaGeneracion, diasDisponibles, exportacion, descripcion, observacion},
      fechaCreacion: this.validateForm.value.fecha[0],
      fechaVenc: this.validateForm.value.fecha[1],
      estado: true,
    }    

  }

  filterActores(tipoActor: any){
    if(tipoActor === 'P'){
      tipoActor = false;
    }
    else
      tipoActor = true;

    this.ListOfClientsAux.length = 0;
    for(let i = 0; i < this.ListOfClients.length; i++){
      if(this.ListOfClients[i].tipo === tipoActor && this.ListOfClients[i].estado === true){
        this.ListOfClientsAux = [... this.ListOfClientsAux, this.ListOfClients[i]];
      }
    }
  }
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo Medidor',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
