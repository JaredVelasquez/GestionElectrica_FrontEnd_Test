import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActorInterface } from 'src/Core/interfaces/actors.interface';

@Component({
  selector: 'app-submit-provider-modal',
  templateUrl: './submit-provider-modal.component.html',
  styleUrls: ['./submit-provider-modal.component.css']
})
export class SubmitProviderModalComponent implements OnInit {
  @Output() DataUpdated : EventEmitter<ActorInterface> = new EventEmitter<ActorInterface>();
  @Input() dataPosition!: ActorInterface;
  listOfProviders: ActorInterface[] = [];
  newProvider!: ActorInterface;
  validateForm!: FormGroup;
  isVisible = false;

  url = {
    get: 'get-providers',
    post: 'actores',
    delete: 'actores',
    update: 'actores',
  };
  constructor(
    private globalService:EndPointGobalService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private nzMessageService: NzMessageService,
  ) { }

  EmptyForm = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.validateForm = this.EmptyForm;
  }

  submitForm(): void{
    if(!this.dataPosition){
      this.submitPostForm();
    }
    else{
      this.submitUpdateForm();
    }
  }

  submitPostForm(){
    if (this.validateForm.valid) {
      this.newProvider = {
        ... this.validateForm.value,
        tipo: false,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        estado: true
      }

      this.globalService.Post(this.url.post, this.newProvider).subscribe(
        (result:any) => {
          if(result){
            this.DataUpdated.emit(result);
            this.isVisible = false;
  
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
  
  submitUpdateForm(){
    if (this.validateForm.valid) {
      this.newProvider = {
        ... this.validateForm.value,
        tipo: false,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        estado: true
      }

      this.globalService.Patch(this.url.update, this.dataPosition.id ,this.newProvider).subscribe(
        (result:any) => {
          if(!result){
            this.UpdateMainTable(this.newProvider);
            this.isVisible = false;
            
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

  editableForm(){
    this.validateForm  = this.fb.group({
      nombre: [this.dataPosition.nombre, [Validators.required]],
      telefono: [this.dataPosition.telefono, [Validators.required]],
      direccion: [this.dataPosition.direccion, [Validators.required]],
      observacion: [this.dataPosition.observacion, [Validators.required]],
    })
  }

  UpdateMainTable(data: ActorInterface){
    this.dataPosition.nombre = data.nombre;
    this.dataPosition.telefono = data.telefono;
    this.dataPosition.observacion = data.observacion;
    this.dataPosition.direccion = data.direccion;

  }

  showModal(): void {
    this.isVisible = true;
    if(!this.dataPosition){
      this.validateForm = this.EmptyForm;
    }else{
      this.editableForm();
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }


}
