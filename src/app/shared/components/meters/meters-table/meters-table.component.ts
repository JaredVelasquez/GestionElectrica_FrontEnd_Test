import { Component, OnInit, Input } from '@angular/core';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { DataMeter } from 'src/Core/interfaces/meter.interface';
import { MetersTableService } from './meters-table.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-meters-table',
  templateUrl: './meters-table.component.html',
  styleUrls: ['./meters-table.component.css']
})
export class MetersTableComponent implements OnInit {
  Id!:number;
  filterCodigo : Array<{text: string, value: any}>  = [];
  filterModel : Array<{text: string, value: any}> = [];
  filterSerie : Array<{text: string, value: any}> = [];
  @Input() listOfData: DataMeter[] = [];
  @Input() listOfColumns: ColumnItem[] = [];
  @Input() url!: string;

  constructor(
    private tableService: MetersTableService
  ) { }

  ngOnInit(): void {
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
    this.tableService.DeleteMeter(Id, this.url).subscribe(
      result => {
        console.log(result);
        this.GetMeters();
      }
    );
  }
  GetMeters(){
    this.tableService.GetMeters().subscribe(
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
}

