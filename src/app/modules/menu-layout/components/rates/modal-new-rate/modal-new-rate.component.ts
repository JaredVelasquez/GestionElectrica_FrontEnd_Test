import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
@Component({
  selector: 'app-modal-new-rate',
  templateUrl: './modal-new-rate.component.html',
  styleUrls: ['./modal-new-rate.component.css']
})
export class ModalNewRateComponent implements OnInit, OnChanges {
  listOfData2: RatesInterface[] = [];
  @Output() ListOfDataUpdated = new EventEmitter<any[]>();
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.listOfData2);
    console.log(this.dataPosition);
    
    
  }
  
  UpdateListOfData(list: any){
    
    this.ListOfDataUpdated.emit(list);
    
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
    if(this.dataPosition){
      this.validateForm =this.fb.group({
        tipo: [String(this.dataPosition.tipo), [Validators.required]],
        descripcion: [this.dataPosition.descripcion, [Validators.required]],
        observacion: [this.dataPosition.observacion, [Validators.required]],
        codigo: [this.dataPosition.codigo, [Validators.required]],
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
        this.listOfData2 = result;
      }
    );
  }
  Post(){
    if (this.validateForm.valid) {
      const provider = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        puntoMedicionId: 1,
        tipo: Boolean(this.validateForm.value.tipo),
        observacion: this.validateForm.value.observacion,
        estado: true,
      }

      if(this.dataPosition){
        this.globalService.PutId( this.url.post, this.dataPosition?.id, provider).subscribe(
          (result:any) => {
            
          }
        );
        
      }else{
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => {
            
          }
        );

      }

      if(this.dataPosition){
        this.dataPosition.codigo = provider.codigo;
        this.dataPosition.descripcion = provider.descripcion;
        this.dataPosition.observacion = provider.observacion;
      }
      this.GetRates();
      this.UpdateListOfData(provider);
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
        this.GetRates();
      }
    );
  }

}