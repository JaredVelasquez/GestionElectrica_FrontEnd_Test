import { Component, OnInit } from '@angular/core';
import { ActorInterface } from 'src/Core/interfaces/actors.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  clients: ActorInterface[] = [];
  fileList : any = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  url = {
    get: 'get-clients',
    post: 'actores',
    delete: '',
    update: '',
  };
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetClients();
    this.validateForm = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    

  }

  GetClients(){
    this.globalService.Get(this.url.get).subscribe(
      (result:any) => {
        this.clients = result;
      }
    );
  }
  
  PostClient(){
    if (this.validateForm.valid) {
      const provider = {
        nombre: this.validateForm.value.nombre,
        tipo: true,
        telefono: this.validateForm.value.telefono,
        direccion: this.validateForm.value.direccion,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        observacion: this.validateForm.value.observacion,
        estado: true
      }
      console.log(provider);
      this.isVisible = false;
      this.globalService.Post(this.url.post, provider).subscribe(
        (result:any) => {
          if(result){
            this.GetClients();
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

}
