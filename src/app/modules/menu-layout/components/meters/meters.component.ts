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
  isVisible = false;
  urlMedidor: string = 'medidors';
  filterCodigo : Array<{text: string, value: any}>  = [];
  filterModel : Array<{text: string, value: any}> = [];
  filterSerie : Array<{text: string, value: any}> = [];
  listOfData: DataItem[] = [];
  options = [
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Fisico', value: 'Fisico' }
  ];
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
  
  constructor(
    private http:HttpClient,
    private metersService: MetersService
  ) { }

  ngOnInit(): void {
    this.GetMeters();
    
    
  }

  ngOnChanges(): void {
    this.GetMeters();
  }
  
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Estado') {
        if(item.sortOrder === 'descend'){
          item.sortOrder = 'ascend';
        }
        else{
          item.sortOrder = 'descend';

        }
      } else {
        item.sortOrder = null;
      }
    });
  }

  resetFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === '#') {
        item.listOfFilter = [];
      } else if (item.name === 'Codigo') {
        item.listOfFilter = this.filterCodigo;
      } else if (item.name === 'Descripcion') {
        item.listOfFilter = [];
      } else if (item.name === 'Modelo') {
        item.listOfFilter = this.filterModel;
      } else if (item.name === 'Serie') {
        item.listOfFilter = this.filterSerie;
      } else if (item.name === 'Tipo') {
        item.listOfFilter = [];
      }else if (item.name === 'Estado') {
        item.listOfFilter = [];
      }
    });
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === '#') {
        item.listOfFilter = [];
        item.sortOrder = null;
      } else if (item.name === 'Codigo') {
        item.listOfFilter = this.filterCodigo;
        item.sortOrder = null;
      } else if (item.name === 'Descripcion') {
        item.listOfFilter = [];
        item.sortOrder = null;
      } else if (item.name === 'Modelo') {
        item.listOfFilter = this.filterModel;
        item.sortOrder = null;
      } else if (item.name === 'Serie') {
        item.listOfFilter = this.filterSerie;
        item.sortOrder = null;
      } else if (item.name === 'Tipo') {
        item.listOfFilter = [];
        item.sortOrder = null;
      }else if (item.name === 'Estado') {
        item.listOfFilter = [];
        item.sortOrder = null;
      }
    });

  }
  DeleteMeter(Id: number){
    this.metersService.DeleteMeter(Id).subscribe(
      result => {
        console.log(result);
        this.GetMeters();
      }
    );
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

        }
      }
    );
  }

  DeleteVirtualMeter(Id : number){
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