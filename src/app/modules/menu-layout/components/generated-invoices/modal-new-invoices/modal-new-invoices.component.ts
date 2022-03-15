import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { toNumber } from 'ng-zorro-antd/core/util';
import { ContractMeterInterface } from 'src/Core/interfaces/contract-meter.interface';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';

@Component({
  selector: 'app-modal-new-invoices',
  templateUrl: './modal-new-invoices.component.html',
  styleUrls: ['./modal-new-invoices.component.css']
})
export class ModalNewInvoicesComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: InvoiceInterface[] = [];
  @Input() ListOfContractMeditors: ContractMeterInterface[] = [];
  @Input() state: number = 0;

  @Output() DataUpdated : EventEmitter<InvoiceInterface> = new EventEmitter<InvoiceInterface>();

  
  url = {
    getcontratosM: '',
    post: 'facturas',
    delete: 'facturas',
    update: 'facturas',
  };

  EmptyForm = this.fb.group({
    contratoMedidorId: [ '', [Validators.required]],
    codigo: [ '', [Validators.required]],
    fechaLectura: ['', [Validators.required]],
    fechaVencimiento: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    tipoConsumo: ['', [Validators.required]],
    energiaConsumida: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  });

  FullForm  = this.fb.group({
    contratoMedidorId: [ '', [Validators.required]],
    codigo: [ '', [Validators.required]],
    fechaLectura: ['', [Validators.required]],
    fechaVencimiento: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    tipoConsumo: ['', [Validators.required]],
    energiaConsumida: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  });
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.EmptyForm;
  }
  
  showModal(): void {
    this.isVisible = true;
      this.validateForm = this.EmptyForm;
    
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
  
  PushData(): void{
    if (this.validateForm.valid) {
      
      let updateData;
      
      const provider = {
        contratoMedidorId:  1,
        codigo:  this.validateForm.value.codigo,
        fechaLectura:  this.validateForm.value.fechaLectura,
        fechaVencimiento:  this.validateForm.value.fechaVencimiento,
        fechaInicio:  this.validateForm.value.fechaInicio,
        fechaFin:  this.validateForm.value.fechaFin,
        tipoConsumo:  toNumber(this.validateForm.value.tipoConsumo),
        energiaConsumida: this.validateForm.value.energiaConsumida,
        observacion:  this.validateForm.value.observacion,
        cargoId: this.validateForm.value.cargoId,
        estado: this.state,
      }   
      console.log(provider);
      
        this.globalService.Post(this.url.post, provider).subscribe(
          (result:any) => { 
            console.log(result);
            
            if(result){
              updateData = result;
              this.DataUpdated.emit(updateData);
            }
          }
        );


      
      this.isVisible = false;
      
      this.validateForm = this.EmptyForm;
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  
  GetContratos(){
    this.globalService.Get(this.url.getcontratosM).subscribe( 
      (result:any) => {
        this.ListOfContractMeditors = result;
      }
    );
  }

}
