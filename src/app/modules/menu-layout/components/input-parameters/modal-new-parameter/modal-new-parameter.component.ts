import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { InputParametersInterface } from 'src/Core/interfaces/input-parameters.interface';
import { ChargesInterface } from 'src/Core/interfaces/charges.interface';

@Component({
  selector: 'app-modal-new-parameter',
  templateUrl: './modal-new-parameter.component.html',
  styleUrls: ['./modal-new-parameter.component.css']
})
export class ModalNewParameterComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InputParametersInterface[] = [];
  @Input() dataPosition!: InputParametersInterface | undefined;
  @Input() ListOfCharges: ChargesInterface[] = [];
  @Output() DataUpdated : EventEmitter<InputParametersInterface> = new EventEmitter<InputParametersInterface>();

  
  url = {
    get: 'get-allparameters',
    getcargo: 'tipo-cargos',
    post: 'parametro-global',
    delete: 'parametro-tarifas',
    update: 'parametro-tarifas',
  };

  EmptyForm = this.fb.group({
    fechaInicio: [ '', [Validators.required]],
    fechaFinal: [ '', [Validators.required]],
    cargo: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  });
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.Get();
    this.validateForm = this.fb.group({
      fechaInicio: [ '', [Validators.required]],
      fechaFinal: [ '', [Validators.required]],
      cargo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    });
  }
  
  showModal(): void {
    this.isVisible = true;
    if(this.dataPosition){
      this.validateForm = this.fb.group({
        fechaInicio: [ this.dataPosition.fechaInicio, [Validators.required]],
        fechaFinal: [ this.dataPosition.fechaFinal, [Validators.required]],
        cargo: [String(this.dataPosition.cargoId), [Validators.required]],
        valor: [this.dataPosition.valor, [Validators.required]],
        observacion: [this.dataPosition.observacion, [Validators.required]],
      });
    }
    else{
      
    this.validateForm = this.EmptyForm;
  
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
  Get(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        this.listOfData = result;
      }
    );
  }
  
    PushData(){
    if (this.validateForm.valid) {
      
      const provider = {
        tipoCargoId: Number(this.validateForm.value.cargo),
        fechaInicio: this.validateForm.value.fechaInicio,
        fechaFinal: this.validateForm.value.fechaFinal,
        valor: this.validateForm.value.valor,
        observacion: this.validateForm.value.observacion,
        tipo: true,
        estado: true,
      }
      console.log(provider);
      

      if(this.dataPosition){
        this.globalService.PutId( this.url.update, this.dataPosition?.idParametro, provider).subscribe(
          (result:any) => {
            
          }
        );
        
      }else{
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => {
            if(result){
              this.DataUpdated.emit(result);
              this.isVisible = false;
            }
            
          }
        );

      }

      if(this.dataPosition){
        if(this.ListOfCharges){
          for(let i=0; i<this.ListOfCharges.length ; i++){
            if(this.ListOfCharges[i].id == provider.tipoCargoId){
              this.dataPosition.cargoNombre = this.ListOfCharges[i].nombre;
              
            }
          }
        }
        this.dataPosition.cargoId = provider.tipoCargoId;
        this.dataPosition.fechaInicio = provider.fechaInicio;
        this.dataPosition.fechaFinal = provider.fechaFinal;
        this.dataPosition.valor = provider.valor;
        this.dataPosition.observacion = provider.observacion;
        console.log(this.dataPosition);
        
      }
      this.Get();
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

  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        this.Get();
      }
    );
  }
}
