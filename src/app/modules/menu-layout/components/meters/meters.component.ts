import { Component, OnInit } from '@angular/core';
import { MetersService } from "../../services/meters.service";
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css']
})
export class MetersComponent implements OnInit {
  
  filterCodigo : Array<{text: string, value: any}> = [];
  filterModel : Array<{text: string, value: any}> = [];
  filterSerie : Array<{text: string, value: any}> = [];
  dataList!: any;
  titleList: object[] = [{name: '#'}, {name: 'Codigo'}, {name: 'Descripcion'}, {name: 'Tipo'}, 
    {name: 'Modelo'}, {name: 'Serie'}, {name: 'Estado'}
  ];
  constructor (
    private metersService: MetersService
  ){

  }

  ngOnInit(): void {
    this.metersService.GetMeters().subscribe(
      (result:any) => {
        this.dataList = result;
        
        if(this.dataList){
          for(let i = 0 ; i < this.dataList.length ; i++){
            
            this.filterModel.push({text: this.dataList[i].Modelo+'', value: this.dataList[i].Modelo});
            this.filterSerie.push({text: this.dataList[i].Serie+'', value: this.dataList[i].Serie})
            this.filterCodigo.push({text: this.dataList[i].Codigo+'', value: this.dataList[i].Codigo});
          }

        }
      }
    );
  }

}
