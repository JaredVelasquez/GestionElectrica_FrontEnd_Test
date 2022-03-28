import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { toNumber } from 'ng-zorro-antd/core/util';
import { MeasurePointSchema } from 'src/Core/interfaces/measure-point.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
  @Input() dataPosition!: MeterSchema;
  @Input() listOfMPoinst: MeasurePointSchema[] = [];
  @Output() DataUpdated : EventEmitter<MeterSchema> = new EventEmitter<MeterSchema>();

  validateForm!: FormGroup;
  isVisible:boolean = false;
  meter!: MeterSchema;
  url = {
    getMeters: 'get-meters',
    getVMeters: 'get-vmeters',
    get: 'medidors',
    postMeter:'medidors',
    del:'medidors',
  }
  EmptyForm = this.fb.group({
    sourceId: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    lecturaMax: ['', [Validators.required]],
    multiplicador: ['', [Validators.required]],
    puntoConexion: ['', [Validators.required]],
    puntoMedicionId: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private  globalService : EndPointGobalService,

  ) { }

  ngOnInit(): void {
    this.validateForm = this.EmptyForm;
  }
  
  showModal(): void {
    this.isVisible = true;
    if(this.dataPosition){
      this.editableFrom(this.dataPosition);

    }else{
      this.validateForm = this.EmptyForm;
    }
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void { 
    if(!this.dataPosition){
      this.submitPostForm();
    }else{
      this.submitUpdateForm();
    }
  }
  
  submitPostForm(){
    
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {
      this.fullSchema();
      this.globalService.Post(this.url.postMeter, this.meter).subscribe(
        (result:any) => {
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

  submitUpdateForm(): void {
    console.log(this.dataPosition);
    
    if (this.validateForm.valid) {
      this.fullSchema();
      this.globalService.Patch(this.url.postMeter, this.dataPosition.id ,this.meter).subscribe(
        (result:any) => {
          if(!result){
            this.updateMainTable();
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

  editableFrom(data: MeterSchema): void{
    console.log(data);
    
    this.validateForm = this.fb.group({
      sourceId: [data.sourceId, [Validators.required]],
      codigo: [data.codigo, [Validators.required]],
      descripcion: [data.descripcion, [Validators.required]],
      modelo: [data.modelo, [Validators.required]],
      serie: [data.serie, [Validators.required]],
      lecturaMax: [data.lecturaMax, [Validators.required]],
      multiplicador: [data.multiplicador, [Validators.required]],
      puntoConexion: [data.puntoConexion, [Validators.required]],
      puntoMedicionId: [data.puntoMedicionId, [Validators.required]],
      observacion: [data.observacion, [Validators.required]],
      tipo: [data.tipo, [Validators.required]],
    });

    console.log(this.validateForm.value);
    
  }

  fullSchema(){
    this.validateForm.value.puntoConexion = toNumber(this.validateForm.value.puntoConexion)
    this.validateForm.value.tipo = toNumber(this.validateForm.value.tipo)

    this.meter = {
      ... this.validateForm.value,
      estado: true
    }
  }

  updateMainTable(): void{
    this.dataPosition = { 
      ... this.validateForm.value
    }
  }

}

  


