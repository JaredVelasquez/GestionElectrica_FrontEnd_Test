import { Component, OnInit, Input , OnChanges} from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { observable } from 'rxjs';
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
  selector: 'app-meters-table',
  templateUrl: './meters-table.component.html',
  styleUrls: ['./meters-table.component.css']
})

export class MetersTableComponent implements OnInit, OnChanges{
  size: NzButtonSize = 'large';
  @Input() filterCodigo : Array<{text: string, value: any}>  = [];
  @Input() filterModel : Array<{text: string, value: any}> = [];
  @Input() filterSerie : Array<{text: string, value: any}> = [];
  @Input() listOfData: DataItem[] = [];
  listOfColumns!: ColumnItem[];
  constructor() { }

  ngOnInit(): void {
    observable
  }

  ngOnChanges(): void {
    this.listOfColumns = [
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
      },
      {
        name: 'Estado',
        sortOrder: null,
        sortDirections: ['ascend', 'descend',null],
        sortFn: (a: DataItem, b: DataItem) => Number(a.Estado) - Number(b.Estado),
        filterMultiple: false,
        listOfFilter: [
        ],
        filterFn: null
      }
    ];
    
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


}
