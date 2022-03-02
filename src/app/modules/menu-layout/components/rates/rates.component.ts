import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { EndPointGobalService } from "@shared/services/end-point-gobal.service";



@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: RatesInterface[] = [];
  dataPosition: any[] = [];
  
  url = {
    get: 'get-rates',
    post: 'tarifas',
    delete: 'tarifas',
    update: 'tarifas',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.GetRates();
    
  }

  
  updateTable(list: any){
    this.listOfData = list;
    
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
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
        this.GetRates();
      }
    );
  }



  
  listOfColumns: ColumnItem[] = [
    {
      name: 'ID',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.id - b.id,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
