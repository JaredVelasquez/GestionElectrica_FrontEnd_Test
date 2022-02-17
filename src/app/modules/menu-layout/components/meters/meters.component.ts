import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MetersService } from "../../services/meters.service";
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';


interface DataItem {
  Codigo: string;
  Descripcion: string;
  Estado: boolean;
  Id: number;
  Modelo: string;
  Serie: string;
  Tipo: boolean;
}


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css']
})
export class MetersComponent implements OnInit, OnChanges {
  Id!:number;
  urlMedidor: string = 'medidors';
  filterCodigo : Array<{text: string, value: any}>  = [];
  filterModel : Array<{text: string, value: any}> = [];
  filterSerie : Array<{text: string, value: any}> = [];
  listOfData: DataItem[] = [];
  property: Array<string> = [];
  options = [
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Fisico', value: 'Fisico' }
  ];
  
  constructor(
    private http:HttpClient,
    private metersService: MetersService
  ) { }

  ngOnInit(): void {
    this.GetMeters();
    
    
  }

  ngOnChanges(): void {
    
  }
  
  GetMeters(){
    this.metersService.GetMeters().subscribe(
      (result:any) => {
        this.listOfData = result;
        
        if(this.listOfData){
          for(let i = 0 ; i < this.listOfData.length ; i++){
            
            this.filterModel.push({text: this.listOfData[i].Modelo+'', value: this.listOfData[i].Modelo});
            this.filterSerie.push({text: this.listOfData[i].Serie+'', value: this.listOfData[i].Serie})
            this.filterCodigo.push({text: this.listOfData[i].Codigo+'', value: this.listOfData[i].Codigo});
          }
          
          for(let property in this.listOfData){
            this.property.push(property);
          }

        }
      }
    );
  }
  
  listOfColumns: ColumnItem[] = [
    {
      name: '#',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.Codigo.localeCompare(b.Codigo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: this.filterCodigo,
      filterFn: (list: string[], item: DataItem) => list.some(codigo => item.Codigo.indexOf(codigo) !== -1)
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Modelo',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.Modelo.localeCompare(b.Modelo),
      filterMultiple: false,
      listOfFilter: 
        this.filterModel
      ,
      filterFn: (address: string, item: DataItem) => item.Modelo.indexOf(address) !== -1
    },
    {
      name: 'Serie',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.Modelo.localeCompare(b.Serie),
      filterMultiple: false,
      listOfFilter: 
        this.filterSerie
      ,
      filterFn: (address: string, item: DataItem) => item.Serie.indexOf(address) !== -1
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: DataItem, b: DataItem) => Number(a.Tipo) - Number(b.Tipo),
      filterMultiple: false,
      listOfFilter: [
      ],
      filterFn: null
    }
  ];
}