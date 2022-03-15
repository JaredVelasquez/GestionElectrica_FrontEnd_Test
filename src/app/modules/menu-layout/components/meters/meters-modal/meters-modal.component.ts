import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
  validateForm!: FormGroup;
  isVisible:boolean = false;
  url = {
    getMeters: 'get-meters',
    getVMeters: 'get-vmeters',
    get: 'medidors',
    postMeter:'medidors',
    del:'medidors',
  }
  options = [
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Fisico', value: 'Fisico' }
  ];
  options2 = [
    { label: 'Baja Tension', value: 'Baja Tension' },
    { label: 'Media Tension', value: 'Media Tension' }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private  globalService : EndPointGobalService,

  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      serie: ['', [Validators.required]],
      lecturaMax: ['', [Validators.required]],
      multiplicador: ['', [Validators.required]],
      puntoMedicionId: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    }
    
    
    );
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

  submitForm(){
    console.log(this.validateForm.value);
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    
    
    
    if (this.validateForm.valid) {
      let meter = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        modelo: this.validateForm.value.modelo,
        serie: this.validateForm.value.serie,
        lecturaMax: this.validateForm.value.lecturaMax,
        multiplicador: this.validateForm.value.multiplicador,
        puntoMedicionId: 1,
        observacion: this.validateForm.value.Observacion,
      }
      this.isVisible = false;
      this.globalService.Post(this.url.postMeter, meter).subscribe(
        (result:any) => {
          if(result){
            
          }
            console.log(result);
          
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

  


