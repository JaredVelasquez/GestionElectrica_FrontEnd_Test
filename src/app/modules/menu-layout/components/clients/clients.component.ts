import { Component, OnInit } from '@angular/core';
import { ActorInterface } from 'src/Core/interfaces/actors.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList: NzUploadFile[] = [];
  filedata: any;

  UPLOAD_FILE = 'src/assets/Images/Clients/'; // File upload path
  previewImage: string | undefined = '';
  previewVisible = false;


  isVisible = false;
  validateForm!: FormGroup;
  clients: ActorInterface[] = [];
  disableClients: boolean = false;
  url = {
    get: 'get-clients',
    post: 'actores',
    delete: 'actores',
    update: 'actores',
  };
  EmptyForm = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
    file: ['', [Validators.required]],
  })
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private msg: NzMessageService,
    private router: Router,
    private message: NzModalService,
  ) { }

  ngOnInit(): void {
    this.GetClients(1);
    this.validateForm = this.EmptyForm;
  }

  GetClients(estado: number){

    if((!this.disableClients) && estado === 0){
      this.disableClients = true;
    }else{
      this.disableClients = false;
    }

    this.globalService.GetId(this.url.get, estado).subscribe(
      (result:any) => {
        this.clients = result;
      }
    );
  }
  
  disableClient(client: ActorInterface, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, client.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetClients(0)
          }else{
            this.GetClients(1);
          }

        }
      }
    );
  }
  
  PostClient(){
    console.log(this.validateForm.value.file);
    
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
      
      
      // console.log(provider);
      // this.isVisible = false;
      // this.globalService.Post(this.url.post, provider).subscribe(
      //   (result:any) => {
      //     if(result){
      //       this.GetClients();
      //     }
          
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
              
  beforeUpload = (file: NzUploadFile): boolean => {
       // Judgment on the upload file type
       const type = file.type;
       if(!type)
        return false;

       const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
            if (str.indexOf(type) < 0) {
                this.message.warning({
                    nzTitle: 'Warning',
                    nzContent: 'Select file failed, only pdf, jpg, jpeg, png and other formats are supported'
                });
                return false;
            }

            this.fileList = this.fileList.concat(file);
            // When the type and size meet the requirements, upload directly; if return false, then you need to call the upload method manually
            return true;
        }
        // Method to get the path when the file upload is finished     	 
    getFileUrl({file, fileList}: any): void {
      console.log(file);
      
            const status = file.status;
            if (status === 'done') {
              this.filedata = file.response.data
              console.log(this.filedata);
              
            } else if (status === 'error') {
              this.msg.error(`${file.name} file upload failed.`);
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
  
handlePreview = (file: NzUploadFile) => {
  this.previewImage = file.url || file.thumbUrl;
  this.previewVisible = true;
};

picturePreview = (file: NzUploadFile) => {
  this.previewImage = file.url || file.thumbUrl;
  this.previewVisible = true;
}

}
