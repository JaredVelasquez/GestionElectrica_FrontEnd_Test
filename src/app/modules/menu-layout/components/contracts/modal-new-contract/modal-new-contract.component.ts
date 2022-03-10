import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ActorInterface } from 'src/Core/interfaces/actors.interface';
import { toBoolean, toNumber } from 'ng-zorro-antd/core/util';



@Component({
  selector: 'app-modal-new-contract',
  templateUrl: './modal-new-contract.component.html',
  styleUrls: ['./modal-new-contract.component.css']
})
export class ModalNewContractComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: ContractInterface | undefined;
  @Input() ListOfClients: ActorInterface[] = [];
  @Output() DataUpdated : EventEmitter<ContractInterface> = new EventEmitter<ContractInterface>();

  
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
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      clasificacion: ['', [Validators.required]],
      actorId: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      diaGeneracion: ['', [Validators.required]],
      diasDisponibles: ['', [Validators.required]],
      exportacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
  }

  showModal(): void {
    this.isVisible = true;
    console.log(this.dataPosition);
    
    if(this.dataPosition){
      this.validateForm = this.fb.group({
        codigo: [ this.dataPosition.codigo , [Validators.required]],
        clasificacion: [ this.dataPosition.clasificacion, [Validators.required]],
        actorId: [ String(this.dataPosition.clienteId), [Validators.required]],
        fechaCreacion: [ this.dataPosition.fechaCreacion, [Validators.required]],
        fechaVencimiento: [ this.dataPosition.fechaVencimiento, [Validators.required]],
        diaGeneracion: [ String(this.dataPosition.diaGeneracion), [Validators.required]],
        diasDisponibles: [ this.dataPosition.diasDisponibles, [Validators.required]],
        exportacion: [ String(this.dataPosition.exportacion), [Validators.required]],
        descripcion: [ this.dataPosition.descripcion, [Validators.required]],
        observacion: [ this.dataPosition.observacion, [Validators.required]],
      })

    }else{
      this.validateForm = this.fb.group({
        codigo: ['', [Validators.required]],
        clasificacion: ['', [Validators.required]],
        actorId: ['', [Validators.required]],
        fechaCreacion: ['', [Validators.required]],
        fechaVencimiento: ['', [Validators.required]],
        diaGeneracion: ['', [Validators.required]],
        diasDisponibles: ['', [Validators.required]],
        exportacion: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        observacion: ['', [Validators.required]],
      })
      
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  PushData(): void{
    if (this.validateForm.valid) {
      let updateData;
      
      
      const provider = {
        codigo:  this.validateForm.value.codigo,
        clasificacion: this.validateForm.value.clasificacion,
        descripcion: this.validateForm.value.descripcion,
        actorId:  toNumber(this.validateForm.value.actorId),
        fechaCreacion:  this.validateForm.value.fechaCreacion,
        fechaVenc:  this.validateForm.value.fechaVencimiento,
        diaGeneracion:  toNumber(this.validateForm.value.diaGeneracion),
        diasDisponibles:  toNumber(this.validateForm.value.diasDisponibles),
        exportacion:  toBoolean(this.validateForm.value.exportacion),
        observacion:  this.validateForm.value.observacion,
        estado: true,
      }      

      if(this.dataPosition?.id){
          this.globalService.PutId( this.url.post, this.dataPosition.id , provider).subscribe(
            (result:any) => {
            }
            );
      }else{
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => { 
            console.log(result);
            
            if(result){
              updateData = result;
              this.DataUpdated.emit(updateData);
            }
          }
        );


      }

      if(this.dataPosition){
        if(this.ListOfClients){
          for(let i=0; i<this.ListOfClients.length ; i++){
            if(this.ListOfClients[i].id == provider.actorId){
              this.dataPosition.cliente = this.ListOfClients[i].nombre;
              
            }
          }
        }
        this.dataPosition.codigo = provider.codigo;
        this.dataPosition.descripcion = provider.descripcion;
        this.dataPosition.fechaCreacion = provider.fechaCreacion;
        this.dataPosition.fechaVencimiento = provider.fechaVenc;
        this.dataPosition.exportacion = provider.exportacion;
        this.dataPosition.clasificacion = provider.clasificacion;
        this.dataPosition.clienteId = provider.actorId;
        this.dataPosition.diaGeneracion = provider.diaGeneracion;
        this.dataPosition.diasDisponibles = provider.diasDisponibles;
        this.dataPosition.observacion = provider.observacion;

        console.log(this.dataPosition);
        


        
      }
      this.isVisible = false;
      
      this.validateForm = this.fb.group({
        codigo: ['', [Validators.required]],
        clasificacion: ['', [Validators.required]],
        actorId: ['', [Validators.required]],
        fechaCreacion: ['', [Validators.required]],
        fechaVencimiento: ['', [Validators.required]],
        diaGeneracion: ['', [Validators.required]],
        diasDisponibles: ['', [Validators.required]],
        exportacion: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        observacion: ['', [Validators.required]],
      })
      
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
