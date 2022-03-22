import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
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

  options = [
    { label: 'tipo 1', value: 0 },
    { label: 'tipo 2', value: 1 }
  ];
  options2 = [
    { label: 'Baja Tension', value: 0 },
    { label: 'Media Tension', value: 1 }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
    // if (this.validateForm.valid) {

    //   console.log(this.validateForm.value);
    //   this.meter = {
    //     ... this.validateForm.value,
    //     estado: true
    //   }
    //   this.isVisible = false;
    //   this.globalService.Post(this.url.postMeter, this.meter).subscribe(
    //     (result:any) => {
    //       if(result){
            
    //       }
    //         console.log(result);
          
    //     }
    //   );
      
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  }

  


