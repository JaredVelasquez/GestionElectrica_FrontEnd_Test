import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { toBoolean, toNumber } from 'ng-zorro-antd/core/util';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';
import { VirtualMeterInterface, VirtualMeterShema } from 'src/Core/interfaces/virtual-meter.interface';


@Component({
  selector: 'app-virtual-meter-modal',
  templateUrl: './virtual-meter-modal.component.html',
  styleUrls: ['./virtual-meter-modal.component.css']
})

export class VirtualMeterModalComponent implements OnInit {
  isVisible = false;
  @Input() listOfVMeters: VirtualMeterInterface[] = [];
  @Input() dataPosition!: MeterSchema;
  newVMeter!: any;
  validateForm!: FormGroup;
  listOfData: VirtualMeterInterface[] = [];
  VMIsDisable: boolean = false;
  IsEditableForm: boolean = false;
  IsEditableSchema!: VirtualMeterInterface;

  url = { 
    post: 'medidor-virtuals-custom',
    getVMetersDetail: 'medidor-virtual-detalles',
    update: 'medidor-virtuals'
  }

  EmptyForm = this.fb.group({
    medidorId: [''],
    porcentaje: ['', [Validators.required]],
    operacion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetVirtualMeters(true, false);
    this.validateForm = this.EmptyForm;
  }
  
  
  GetVirtualMeters(estado: boolean, switched: boolean){    
    
    if(switched){
      this.listOfData.length = 0;
      for(let i = 0; i < this.listOfVMeters.length ; i++){
        if(this.dataPosition.id === this.listOfVMeters[i].medidorId && this.listOfVMeters[i].estado === estado){
          this.listOfData = [... this.listOfData, this.listOfVMeters[i]];
          
        }
      }
      if((!this.VMIsDisable) && estado === false){
        this.VMIsDisable = true;
      }else{
        this.VMIsDisable = false;
      }
    }else{
      this.listOfData.length = 0;
      for(let i = 0; i < this.listOfVMeters.length ; i++){
        if(this.dataPosition.id === this.listOfVMeters[i].medidorId && this.listOfVMeters[i].estado === estado){
          this.listOfData = [... this.listOfData, this.listOfVMeters[i]];
        }
      }
    }
    
    this.listOfData = [... this.listOfData];
  }
  
  submitForm(estado: boolean){
    if(!this.IsEditableForm){
      this.submitPostForm(estado);
    }
    else if(this.IsEditableForm){
      this.submitUpdateForm();
    }
  }

  submitPostForm(estado: boolean): void{
    if (this.validateForm.valid) {
      this.newVMeter = {
        ... this.validateForm.value,
        estado: true
      }
      this.globalService.Post(this.url.post, this.newVMeter).subscribe(
        (result:any) => {
          if(result){
            
            this.listOfVMeters = [...this.listOfVMeters, result];
            if(estado){
              this.GetVirtualMeters(false, false);

            }else{
              
              this.GetVirtualMeters(true, false);
            }
            this.cleanForm();
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
  
  submitUpdateForm(){
    
    if (this.validateForm.valid) {
      const {porcentaje, operacion, observacion} =  this.validateForm.value;
      this.newVMeter = {
        ... {porcentaje, operacion, observacion},
        estado: true
      }
      this.IsEditableSchema.observacion = this.newVMeter.observacion;
      this.IsEditableSchema.operacion = this.newVMeter.operacion;
      this.IsEditableSchema.porcentaje = this.newVMeter.porcentaje;
      
      if(this.IsEditableSchema)
      this.globalService.PutId(this.url.update, this.IsEditableSchema.vmedidorId, this.newVMeter).subscribe(
        (result:any) => {
          if(!result){
            this.updateTable(this.IsEditableSchema);
            this.IsEditableForm = false;
            this.cleanForm();
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

  editableForm(data: VirtualMeterInterface){
    
    console.log(data);
    this.IsEditableSchema = data;
    this.IsEditableForm = true;
    this.validateForm = this.fb.group({
      medidorId: [data.medidorId],
      porcentaje: [data.porcentaje, [Validators.required]],
      operacion: [data.operacion, [Validators.required]],
      observacion: [data.observacion, [Validators.required]],
    })

  }
  
  disableVMeter(vmeter: VirtualMeterInterface, estado : boolean){

    this.globalService.Patch(this.url.getVMetersDetail, vmeter.id, {estado: estado}).subscribe(
      result => {
        if(!result){
          for(let i = 0; i < this.listOfVMeters.length; i++){
            if(this.listOfVMeters[i].id === vmeter.id){
              this.listOfVMeters[i].estado = estado;
            }
          }

          if(estado === true){
            this.GetVirtualMeters(false, false);
          }else{
            this.GetVirtualMeters(true, false);
          }

        }
      }
    );
  }


  cleanForm(): void{
    this.validateForm = this.fb.group({
      medidorId: [this.dataPosition.id],
      porcentaje: ['', [Validators.required]],
      operacion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
  }


  updateTable(data: any){
    console.log(data);
    for(let i = 0;i < this.listOfData.length; i++){
      if(this.listOfData[i].vmedidorId === data.vmedidorId && this.listOfData[i].id === data.id ){
        console.log(data);
        
        this.listOfData[i] = data;
      }
    }
    
    console.log(this.listOfData);
    this.listOfData = [... this.listOfData];
    
  }

  showModal(): void {
    this.isVisible = true;
    this.GetVirtualMeters(true, false);
    this.validateForm = this.EmptyForm;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Porcentaje',
      sortOrder: 'descend',
      sortFn: (a: VirtualMeterShema, b: VirtualMeterShema) => a.porcentaje - b.porcentaje,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Operacion',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: VirtualMeterShema, b: VirtualMeterShema) => Number(a.operacion) - Number(b.operacion),
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: null
    },
  ];

}
