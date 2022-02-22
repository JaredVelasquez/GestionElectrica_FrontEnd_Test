import { Component, OnInit } from '@angular/core';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ZoneInterface } from 'src/Core/interfaces/zones.interface';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  isVisible = false;
  listOfData: ZoneInterface[] = [];
  validateForm!: FormGroup;
  url = {
    get: 'get-zones',
    post: 'zonas',
    delete: 'zonas',
    update: '',
  };

  constructor(
    private metersService: MetersService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.GetZones();
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    
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
  GetZones(){
    this.metersService.Get(this.url.get).subscribe( 
      (result:any) => {
        console.log(result);
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }
  PostZone(){
    if (this.validateForm.valid) {
      const provider = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        observacion: this.validateForm.value.observacion,
      }
      console.log(provider);
      this.isVisible = false;
      this.metersService.Post(this.url.post, provider).subscribe(
        (result:any) => {
          if(result){
            this.GetZones();
            
          }
            console.log(result);
          
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
  DeleteZone(Id: any){
    Id = Number(Id);
    this.metersService.DeleteMeter(Id, this.url.delete).subscribe(
      result => {
        console.log(result);
        this.GetZones();
      }
    );
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: ZoneInterface, b: ZoneInterface) => a.Codigo - b.Codigo,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: 'descend',
      sortFn: (a: ZoneInterface, b: ZoneInterface) => a.Descripcion.localeCompare(b.Descripcion),
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
