import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { MeasurePointSchema } from 'src/Core/interfaces/measure-point.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
  @Input() listOfMPoinst: MeasurePointSchema[] = [];
  @Output() DataUpdated : EventEmitter<MeasurePointSchema> = new EventEmitter<MeasurePointSchema>();
  
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
    this.validateForm = this.EmptyForm;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(){
    
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {

      console.log(this.validateForm.value);
      this.meter = {
        ... this.validateForm.value,
        estado: true
      }
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

  }

  


