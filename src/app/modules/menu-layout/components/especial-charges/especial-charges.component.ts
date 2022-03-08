import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";
import { EspecialChargesInterface } from 'src/Core/interfaces/especial-charges.interface';

@Component({
  selector: 'app-especial-charges',
  templateUrl: './especial-charges.component.html',
  styleUrls: ['./especial-charges.component.css']
})
export class EspecialChargesComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: EspecialChargesInterface[] = [];
  url = {
    get: 'get-especial-charges',
    post: 'cargos-facturas',
    delete: 'cargos-facturas',
    update: 'cargos-facturas',
  };

  constructor(
    private globalService: EndPointGobalService,
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
  
  
  updateTable(list: EspecialChargesInterface){
    if(list){
      this.GetRates();
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
  GetRates(){
    this.globalService.Get(this.url.get).subscribe( 
      (result:any) => {
        this.listOfData = result;
      }
    );
  }
  DeleteRate(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        console.log(result);
        this.GetRates();
      }
    );
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: 'ascend',
      sortFn: (a: EspecialChargesInterface, b: EspecialChargesInterface) => a.id - (b.id),
      sortDirections: [ 'ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicio',
      sortOrder: null,
      sortFn: (a: EspecialChargesInterface, b: EspecialChargesInterface) => a.fechaInicio.localeCompare(b.fechaInicio),
      sortDirections: [ 'ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: null,
      sortFn: (a: EspecialChargesInterface, b: EspecialChargesInterface) => a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: [ 'ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}

