import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { ActorInterface } from 'src/Core/interfaces/actors.interface';

@Component({
  selector: 'app-submit-client-modal',
  templateUrl: './submit-client-modal.component.html',
  styleUrls: ['./submit-client-modal.component.css']
})
export class SubmitClientModalComponent implements OnInit {
  @Output() DataUpdated : EventEmitter<ActorInterface> = new EventEmitter<ActorInterface>();
  @Input() dataPosition!: ActorInterface;
  listOfProviders: ActorInterface[] = [];
  newProvider!: ActorInterface;
  validateForm!: FormGroup;
  isVisible = false;
  file!: any;
  previsualize!: any;
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
    private sanitizer: DomSanitizer
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

  captureFile(event: any): any{
    this.file = event.target.files[0];
    this.extraerBase64(this.file).then((file:any) => {
      this.previsualize = file.base;
      
    })
  }

  submitForm(): void{
    if(!this.dataPosition){
      this.submitPostForm();
    }
    else{
      this.submitUpdateForm();
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, rejects) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null 
        })
      };
      return true;

    }catch(e){
      return null;
    }
  });

  submitPostForm(){
    if (this.validateForm.valid) {
      this.newProvider = {
        ... this.validateForm.value,
        tipo: true,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        estado: true
      }

      this.globalService.Post(this.url.post, this.newProvider).subscribe(
        (result:any) => {
          console.log(result);
          
          if(result){
            this.DataUpdated.emit(result);
            this.isVisible = false;
            this.notificationService.createMessage('success', 'Cliente creado exitosamente 😎');
          }else{
            this.notificationService.createMessage('error', 'Fallo en la creacion del cliente 😓');
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
        tipo: true,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        estado: true
      }

      this.globalService.Patch(this.url.update, this.dataPosition.id ,this.newProvider).subscribe(
        (result:any) => {
          if(!result){
            this.newProvider.id = this.dataPosition.id;
            this.UpdateMainTable(this.newProvider);
            this.isVisible = false;
            
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


}

