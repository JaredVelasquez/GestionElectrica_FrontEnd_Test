import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { MeterInterface } from 'src/Core/interfaces/meter.interface';

@Component({
  selector: 'app-meters-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meters-table.component.html',
  styleUrls: ['./meters-table.component.css']
})
export class MetersTableComponent implements OnInit, OnChanges {
  Id!:number;
  @Input() filterCodigo : Array<{text: string, value: any}>  = [];
  @Input() filterModel : Array<{text: string, value: any}> = [];
  @Input() filterSerie : Array<{text: string, value: any}> = [];
  @Input() listOfData: MeterInterface[] = [];
  @Input() listOfColumns: ColumnItem[] = [];
  @Input() url!: string;
  @Input() properties!: Array<any> ;
  listOfDataVM: any[] = []; 
  datap:MeterInterface[] = [];
  property: Array<string> = [];

  constructor(
    private globalService: EndPointGobalService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      // for(const datap in this.listOfData[0]){
      //   this.property.push(datap);
      // }

      // for(let i = 0; i< this.listOfData.length ; i++){
      //   let ObjTmp: DataMeter;
      //   ObjTmp = this.listOfData[i];
      //   for(let j = 0; j< this.property.length ; j++){
      //     let prop: String = this.property[j];
      //     console.log(`${property}: ${object[property]}`);
          
      //     console.log(Object.values(this.listOfData[i]));
      //   }

      // }

      
      
      //   for(let data in this.listOfData[0]){
      //     let index = data + '';
      //     console.log(`${(this.listOfData[i])[data]}`);
      //     console.log((this.listOfData[0])[index]);

      //   }
      // for(let i = 0; i< this.listOfData.length ; i++){
      //   console.log((this.listOfData[i])[this.property[0].toString()]);
      // }
    
      
  }


  
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortByAge(): void {
    
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
    this.globalService.Delete(this.url, Id).subscribe(
      result => {
        console.log(result);
      }
    );
  }
  

  DeleteVirtualMeter(Id : number){
  }
}

