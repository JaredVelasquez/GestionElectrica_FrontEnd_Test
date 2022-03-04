import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
@Component({
  selector: 'app-modal-new-rate',
  templateUrl: './modal-new-rate.component.html',
  styleUrls: ['./modal-new-rate.component.css']
})
export class ModalNewRateComponent implements OnInit {
  listOfData: RatesInterface[] = [];
  @Output() ListOfDataUpdated = new EventEmitter<string>();
  @Input() dataPosition!: RatesInterface | undefined;

  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  list: any[] = [];
  
  url = {
    get: 'get-rates',
    post: 'tarifas',
    delete: 'tarifas',
    update: 'tarifas',
  };

  EmptyForm = this.fb.group({
    codigo: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  });

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    this.validateForm = this.EmptyForm;

    
  }

  
  UpdateListOfData(list: any[]){
    console.log(list);
    
    this.ListOfDataUpdated.emit('list');
    console.log(this.ListOfDataUpdated);
    
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
    if(this.dataPosition){
      this.validateForm =this.fb.group({
        codigo: [this.dataPosition.codigo, [Validators.required]],
        tipo: [String(this.dataPosition.tipo), [Validators.required]],
        descripcion: [this.dataPosition.descripcion, [Validators.required]],
        observacion: [this.dataPosition.observacion, [Validators.required]],
      });
    }
  }

  handleOk(): void {
    this.isVisible = false;
    this.validateForm = this.EmptyForm;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm = this.EmptyForm;
  }
  GetRates(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        this.listOfData = result;
      }
    );
  }
  Post(): void{
    if (this.validateForm.valid) {
      const provider = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        puntoMedicionId: 1,
        tipo: Boolean(this.validateForm.value.tipo),
        observacion: this.validateForm.value.observacion,
        estado: true,
      }
      this.isVisible = false;
      if(this.dataPosition){
        this.globalService.PutId( this.url.post, this.dataPosition?.id, provider).subscribe(
          (result:any) => {
            
          }
        );
        
        this.GetRates();
        this.UpdateListOfData(this.listOfData);
      }else{
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => {
            if(result){
              this.GetRates();
              this.UpdateListOfData(this.listOfData);
              
            }
            
          }
        );
      }
      
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
        this.GetRates();
      }
    );
  }

}
