import { Component, OnInit , Input} from '@angular/core';
import { MetersService } from "@modules/menu-layout/services/meters.service";
import { MeterInterface } from 'src/Core/interfaces/model-meter.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { MetersTableComponent } from "../meters-table/meters-table.component";

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
  validateForm!: FormGroup;
  isVisible:boolean = false;
  url: string = 'medidors';
  meter!: MeterInterface;
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
    private  meterService : MetersService,
    private metersTableComponent: MetersTableComponent

  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      serie: ['', [Validators.required]],
      lecturaMax: ['', [Validators.required]],
      multiplicador: ['', [Validators.required]],
      //puntoMedicionId: ['', [Validators.required]],
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
      this.meter = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        modelo: this.validateForm.value.modelo,
        serie: this.validateForm.value.serie,
        lecturaMax: this.validateForm.value.lecturaMax,
        multiplicador: this.validateForm.value.multiplicador,
        puntoMedicionId: 1,
        observacion: this.validateForm.value.Observacion,
      }
      console.log(this.meter);
      this.isVisible = false;
      this.meterService.PostMeter(this.url, this.meter).subscribe(
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

  


