import { Component, OnInit } from '@angular/core';
import { ActorInterface } from "src/Core/interfaces/actors.interface";
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  isVisible = false;
  url = {
    get: 'get-providers',
    post: 'actores',
    delete: 'actores',
    update: 'actores',
  };
  disableClients: boolean = false;
  previewImage: string | undefined = '';
  previewVisible = false;
  providers: ActorInterface[] = [];
  validateForm!: FormGroup;
  fileList : any = [];
  constructor(
    private globalService:EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  EmptyForm = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.GetProviders(1);
    this.validateForm = this.EmptyForm;
  }

  GetProviders(estado: number){

    if((!this.disableClients) && estado === 0){
      this.disableClients = true;
    }else{
      this.disableClients = false;
    }

    this.globalService.GetId(this.url.get, estado).subscribe(
      (result:any) => {
        this.providers = result;
      }
    );
  }
  
  disableProvider(client: ActorInterface, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, client.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetProviders(0)
          }else{
            this.GetProviders(1);
          }

        }
      }
    );
  }
  PostProvider(){
    if (this.validateForm.valid) {
      const provider = {
        nombre: this.validateForm.value.nombre,
        tipo: false,
        telefono: this.validateForm.value.telefono,
        direccion: this.validateForm.value.direccion,
        imagen: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140800126/30454176-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6',
        observacion: this.validateForm.value.observacion,
        estado: true
      }
      // console.log(provider);
      // this.isVisible = false;
      // this.globalService.Post(this.url.post, provider).subscribe(
      //   (result:any) => {
      //     if(result){
      //       this.GetProviders();
            
      //     }
      //       console.log(result);
          
      //   }
      // );
      
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

  // handlePreview = async (file: NzUploadFile): Promise<void> => {
  //   if (!file.url && !file.) {
  //     file.preview = await getBase64(file.originFileObj!);
  //   }
  //   this.previewImage = file.url || file.preview;
  //   this.previewVisible = true;
  // };

}
