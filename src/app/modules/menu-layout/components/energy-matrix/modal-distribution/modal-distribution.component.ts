import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';


@Component({
  selector: 'app-modal-distribution',
  templateUrl: './modal-distribution.component.html',
  styleUrls: ['./modal-distribution.component.css']
})
export class ModalDistributionComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: any[] = [];
  url = {
    get: 'get-zones',
    post: 'zonas',
    delete: 'zonas',
    update: '',
  };

  constructor(
    private globalService: MetersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    
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
  GetRates(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        console.log(result);
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }
  Post(): void{
    if (this.validateForm.valid) {
      const provider = {
        codigo: this.validateForm.value.codigo,
        descripcion: this.validateForm.value.descripcion,
        observacion: this.validateForm.value.observacion,
      }
      console.log(provider);
      this.isVisible = false;
      this.globalService.Post(this.url.post, provider).subscribe(
        (result:any) => {
          if(result){
            this.GetRates();
            
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
  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.DeleteMeter(Id, this.url.delete).subscribe(
      result => {
        console.log(result);
        this.GetRates();
      }
    );
  }

  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Tipo',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Consumo energia',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Emisiones CO2',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];
}