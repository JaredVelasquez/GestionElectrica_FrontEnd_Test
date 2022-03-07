import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { ActorInterface } from 'src/Core/interfaces/actors.interface';



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
  @Input() ListOfData: ContractInterface[] = [];

  
  url = {
    get: 'get-contracts',
    post: 'contratos',
    delete: 'contratos',
    update: 'contratos',
  };
  options = [
    { label: 'Fecha Contrato', value: true },
    { label: 'Especifica', value: false }
  ];
  

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
    if(this.dataPosition){
      console.log(this.dataPosition);
      
      this.validateForm = this.fb.group({
        codigo: [ this.dataPosition.codigo , [Validators.required]],
        clasificacion: [ String(this.dataPosition.clasificacion), [Validators.required]],
        actorId: [ String(this.dataPosition.clienteId), [Validators.required]],
        fechaCreacion: [ this.dataPosition.fechaCreacion, [Validators.required]],
        fechaVencimiento: [ this.dataPosition.fechaVencimiento, [Validators.required]],
        diaGeneracion: [ String(this.dataPosition.diaGeneracion), [Validators.required]],
        diasDisponibles: [ this.dataPosition.diasDisponibles, [Validators.required]],
        exportacion: [ (this.dataPosition.exportacion), [Validators.required]],
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
  Get(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        result.id = Number(result.id);
        this.ListOfData = result;
      }
    );
  }

 
  PushData(): void{
    if (this.validateForm.valid) {
      
      console.log(this.validateForm.value);
      
      const provider = {
        codigo:  this.validateForm.value.codigo,
        clasificacion:  (this.validateForm.value.clasificacion),
        actorId:  Number(this.validateForm.value.actorId),
        fechaCreacion:  this.validateForm.value.fechaCreacion,
        fechaVencimiento:  this.validateForm.value.fechaVencimiento,
        diaGeneracion:  Number(this.validateForm.value.diaGeneracion),
        diasDisponibles:  Number(this.validateForm.value.diasDisponibles),
        exportacion:  Boolean(this.validateForm.value.exportacion),
        descripcion: this.validateForm.value.descripcion,
        observacion:  this.validateForm.value.observacion,
        estado: true,
      }
      console.log(provider);
      

      if(this.dataPosition){
        this.globalService.PutId( this.url.post, this.dataPosition?.id, provider).subscribe(
          (result:any) => {
            
          }
        );
        
      }else{
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => {
            this.Get();
            
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
        this.dataPosition.fechaVencimiento = provider.fechaVencimiento;
        
      }
      this.isVisible = false;
      
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
