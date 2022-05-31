import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ManualInterface, ManualSchema } from 'src/Core/interfaces/manualRegister.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';
import { VariableSchema } from 'src/Core/interfaces/variable.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-manual-registration-modal',
  templateUrl: './manual-registration-modal.component.html',
  styleUrls: ['./manual-registration-modal.component.css']
})
export class ManualRegistrationModalComponent implements OnInit, OnChanges {
  searchValue = '';
  visible = false;
  isVisible = false;
  listOfData: ManualInterface[] = [];
  listOfManualRegisters: ManualInterface[] = [];
  @Input() dataPosition!: MeterSchema;
  @Input() listOfVariables: VariableSchema[] = [];
  newManualRegister!: ManualSchema;
  listOfDisplayData: ManualSchema[] = [];
  manualRegistersIsActive: boolean = false;
  validateForm!: FormGroup;
  editableSchema!: ManualInterface;
  isEditable: boolean = false;

  url = {
    get: 'get-registros-manuales',
    post:'registro-manuals',
    update: 'registro-manuals',
  }

  EmptyForm = this.fb.group({
    medidorId: ['', [Validators.required]],
    variableId: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    valor: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private  globalService : EndPointGobalService,
    private nzMessageService: NzMessageService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.EmptyForm;
    this.GetManualRegisters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.EmptyForm = this.fb.group({
      medidorId: [this.dataPosition.id, [Validators.required]],
      variableId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
    this.listOfDisplayData = [...this.listOfData];
  }

  GetManualRegisters(){
    this.globalService.Get(this.url.get).subscribe(
      (result:any) => {
        this.listOfManualRegisters = result;
        this.listOfData = [... this.listOfManualRegisters];
      }
    );

  }

  submitForm(): void { 
    if(this.isEditable)
      this.submitUpdateForm();
    else
      this.submitPostForm();
    this.validateForm = this.EmptyForm;
  }
  
  submitPostForm(){
    
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {
      this.fullSchema();
      this.globalService.Post(this.url.post, this.newManualRegister).subscribe(
        (result:any) => {
          if(result){
            console.log(result);
            
            this.postTable(result);
            
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
    
    if (this.validateForm.valid) {
      this.fullSchema();
      this.newManualRegister.estado = this.editableSchema.estado;
      this.editableSchema.variableId = this.newManualRegister.variableId;
      this.editableSchema.fecha = this.newManualRegister.fecha;
      this.editableSchema.valor = this.newManualRegister.valor;
      this.globalService.PutId(this.url.update, this.editableSchema.id ,this.newManualRegister).subscribe(
        (result:any) => {
          if(!result){
            this.updateTable(this.editableSchema, this.editableSchema.estado);
            this.isEditable = false;
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
          }else{
            this.notificationService.createMessage('error', 'La accion fallo 😓');
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

  editableFrom(data: ManualInterface): void{
    this.validateForm = this.fb.group({
      medidorId: [this.dataPosition.id, [Validators.required]],
      variableId: [data.variableId , [Validators.required]],
      fecha: [data.fecha.toString(), [Validators.required]],
      valor: [data.valor, [Validators.required]],
    });
    this.editableSchema = data;
    console.log(this.editableSchema);
    
    this.isEditable = true;
  }

  disable(data: ManualInterface ,estado:boolean){
    data.estado = estado;
    this.globalService.Patch(this.url.update, data.id, {estado: estado}).subscribe(
      (result: any) => {
        if(!result){
          this.updateTable(data, !data.estado);
          this.nzMessageService.create('success', 'Accion completada 😎');
        }else{
          this.nzMessageService.create('error', 'La ejecucion fallo 😟')
        }
      }
    );
  }

  fullSchema(){
    this.newManualRegister = {
      ... this.validateForm.value,
      estado: true
    }
  }

  postTable(data: ManualInterface){
    this.listOfManualRegisters = [ ... this.listOfManualRegisters , data]
    this.listOfData = [... this.listOfData, data];
    this.listOfData = [... this.listOfData];
  }

  updateTable(data: ManualInterface, estado: boolean): void{
    this.listOfData.length = 0;
    for(let i = 0; i < this.listOfManualRegisters.length; i++){
      if(data.id === this.listOfManualRegisters[i].id){
        this.listOfManualRegisters[i] = {... data};
        for(let j = 0; j < this.listOfVariables.length; j++){
          if(data.variableId === this.listOfVariables[j].id){
            this.listOfManualRegisters[i].descripcion = this.listOfVariables[j].descripcion;
          }
        }
        
      }
    }
    this.FilterManualRegisters(data.estado, false)
    
  }
  
  FilterManualRegisters(estado: boolean, switched: boolean){
    
    if(switched){
      if(estado)
        this.manualRegistersIsActive = false;
      else
        this.manualRegistersIsActive = true;

    }
    
    this.listOfData.length = 0;
    for(let i=0; i < this.listOfManualRegisters.length; i++){
      if(this.listOfManualRegisters[i].medidorId === this.dataPosition.id && this.listOfManualRegisters[i].estado === estado){
        this.listOfData = [... this.listOfData, this.listOfManualRegisters[i]];
      }
    }
    

    this.listOfData = this.listOfData;
    
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  showModal(): void {
    this.isVisible = true;
    this.FilterManualRegisters(true, false);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  cleanForm(){
    this.validateForm = this.fb.group({
      medidorId: [this.dataPosition.id, [Validators.required]],
      variableId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: ManualSchema) => item.fecha.indexOf(this.searchValue) !== -1);
  }
}
