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
  @Output() ListOfDataUpdated : EventEmitter<any> = new EventEmitter();
  @Input() dataPosition!: RatesInterface;

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

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    console.log(this.dataPosition);
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    
  }

  
  UpdateListOfData(list: any){
    this.isVisible = false;
    this.ListOfDataUpdated.emit(list);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
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
//        observacion: this.validateForm.value.observacion,
        estado: true,
      }
      console.log(provider);
      this.isVisible = false;
      if(this.dataPosition){
        this.globalService.PutId( this.url.post, this.dataPosition?.id, provider).subscribe(
          (result:any) => {
            if(result){
              this.GetRates();
              this.UpdateListOfData(this.listOfData);
              
            }
            
          }
        );
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
