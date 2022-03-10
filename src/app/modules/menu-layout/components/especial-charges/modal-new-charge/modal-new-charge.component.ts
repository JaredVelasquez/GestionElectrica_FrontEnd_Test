import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { toNumber } from 'ng-zorro-antd/core/util';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { EspecialChargesInterface } from 'src/Core/interfaces/especial-charges.interface';
import { InputParametersInterface } from 'src/Core/interfaces/input-parameters.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";

@Component({
  selector: 'app-modal-new-charge',
  templateUrl: './modal-new-charge.component.html',
  styleUrls: ['./modal-new-charge.component.css']
})
export class ModalNewChargeComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: EspecialChargesInterface | undefined;
  @Output() DataUpdated : EventEmitter<EspecialChargesInterface> = new EventEmitter<EspecialChargesInterface>();

  listOfData: any[] = [];
  url = {
    get: 'get-especial-charges',
    post: 'cargos-facturas',
    delete: 'cargos-facturas',
    update: 'cargos-facturas',
  };

  EmptyForm: FormGroup = this.fb.group({
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    cargoFinanciamiento: ['', [Validators.required]],
    ajuste: ['', [Validators.required]],
    cargoCorte: ['', [Validators.required]],
    cargoMora: ['', [Validators.required]],
    otrosCargos: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  });

  EditableForm: FormGroup = this.fb.group({
    fechaInicio: [this.dataPosition?.fechaInicio, [Validators.required]],
    fechaFinal: [this.dataPosition?.fechaFinal, [Validators.required]],
    descripcion: [this.dataPosition?.descripcion, [Validators.required]],
    cargoFinanciamiento: [this.dataPosition?.cargoFinanciamiento, [Validators.required]],
    ajuste: [this.dataPosition?.ajuste, [Validators.required]],
    cargoCorte: [this.dataPosition?.cargoCorte, [Validators.required]],
    cargoMora: [this.dataPosition?.cargoMora, [Validators.required]],
    otrosCargos: [this.dataPosition?.otrosCargos, [Validators.required]],
    observacion: [this.dataPosition?.observacion, [Validators.required]],
  });
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.Get();
    
    this.validateForm = this.EmptyForm;
  }
  
  showModal(): void {
    this.validateForm = this.EmptyForm;
    this.isVisible = true;
    if(this.dataPosition){
      this.validateForm = this.fb.group({
        fechaInicio: [this.dataPosition?.fechaInicio, [Validators.required]],
        fechaFinal: [this.dataPosition?.fechaFinal, [Validators.required]],
        descripcion: [this.dataPosition?.descripcion, [Validators.required]],
        cargoFinanciamiento: [this.dataPosition?.cargoFinanciamiento, [Validators.required]],
        ajuste: [this.dataPosition?.ajuste, [Validators.required]],
        cargoCorte: [this.dataPosition?.cargoCorte, [Validators.required]],
        cargoMora: [this.dataPosition?.cargoMora, [Validators.required]],
        otrosCargos: [this.dataPosition?.otrosCargos, [Validators.required]],
        observacion: [this.dataPosition?.observacion, [Validators.required]],
      });
      console.log(this.validateForm.value);
      
    }else{
      this.validateForm = this.fb.group({
        fechaInicio: ['', [Validators.required]],
        fechaFinal: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        cargoFinanciamiento: ['', [Validators.required]],
        ajuste: ['', [Validators.required]],
        cargoCorte: ['', [Validators.required]],
        cargoMora: ['', [Validators.required]],
        otrosCargos: ['', [Validators.required]],
        observacion: ['', [Validators.required]],
      });
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
        console.log(result);
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }

  
  PushData(): void{
    if (this.validateForm.valid) {
      let updateData;
      
      
      const provider = {
        fechaInicio: this.validateForm.value.fechaInicio,
        fechaFinal: this.validateForm.value.fechaFinal,
        descripcion: this.validateForm.value.descripcion,
        cargoFinanciamiento: this.validateForm.value.cargoFinanciamiento,
        ajuste: this.validateForm.value.ajuste,
        cargoCorte: this.validateForm.value.cargoCorte,
        cargoMora: this.validateForm.value.cargoMora,
        otrosCargos: this.validateForm.value.otrosCargos,
        observacion: this.validateForm.value.observacion,
        totalCargos: 
        toNumber(this.validateForm.value.cargoCorte + this.validateForm.value.cargoMora
        + this.validateForm.value.otrosCargos + this.validateForm.value.ajuste),
        estado: 1
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
        this.dataPosition.ajuste = provider.ajuste;
        this.dataPosition.cargoCorte = provider.cargoCorte;
        this.dataPosition.cargoFinanciamiento = provider.cargoFinanciamiento;
        this.dataPosition.cargoMora = provider.cargoMora;
        this.dataPosition.descripcion = provider.descripcion;
        this.dataPosition.estado = provider.estado;
        this.dataPosition.fechaFinal = provider.fechaFinal;
        this.dataPosition.fechaInicio = provider.fechaInicio;
        this.dataPosition.observacion = provider.observacion;
        this.dataPosition.otrosCargos = provider.otrosCargos;
        this.dataPosition.totalCargos = provider.totalCargos;
        


        
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


  DeleteRate(Id: any){
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        console.log(result);
        this.Get();
      }
    );
  }
}

