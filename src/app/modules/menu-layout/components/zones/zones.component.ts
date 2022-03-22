import { Component, OnInit } from '@angular/core';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ZoneShema } from 'src/Core/interfaces/zones.interface';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  isVisible = false;
  zonaIsDisable: boolean = false;
  listOfData: ZoneShema[] = [];
  validateForm!: FormGroup;
  provider!: ZoneShema;
  url = {
    get: 'get-zones',
    post: 'zonas',
    delete: 'zonas',
    update: 'zonas',
  };
  EmptyForm =this.fb.group({
    codigo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })
  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.GetZones(1, false);
    this.validateForm = this.EmptyForm;
  }
  

  GetZones(estado: number, switched: boolean){
    if(switched){
      if((!this.zonaIsDisable) && estado === 0){
        this.zonaIsDisable = true;
      }else{
        this.zonaIsDisable = false;
      }
    }

    this.globalService.GetId(this.url.get, estado).subscribe(
      (result:any) => {
        this.listOfData = result;
      }
    );
  }
  
  disableClient(zone: ZoneShema, estado : number){
    let newEstado = Boolean(estado);
    this.globalService.Patch(this.url.update, zone.id, {estado: newEstado}).subscribe(
      result => {
        if(!result){
          if(estado === 1){
            this.GetZones(0, false);
          }else{
            this.GetZones(1, false);
          }

        }
      }
    );
  }
  
  PostZone(){
    if (this.validateForm.valid) {
      this.provider = {
        ... this.validateForm.value,
        estado: true
      }
      console.log(this.provider);
      this.isVisible = false;
      this.globalService.Post(this.url.post, this.provider).subscribe(
        (result:any) => {
          if(result){
            if(result.estado === true){
              this.GetZones(1, false);
            }else{
              this.GetZones(0, false);
            }
  
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



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: ZoneShema, b: ZoneShema) => a.codigo - b.codigo,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: 'descend',
      sortFn: (a: ZoneShema, b: ZoneShema) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Observacion',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [
      ],
      filterFn: null
    }
  ];

}
