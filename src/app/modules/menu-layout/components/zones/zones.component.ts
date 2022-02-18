import { Component, OnInit } from '@angular/core';
import { MetersService } from '@modules/menu-layout/services/meters.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ZonesService } from "../../services/zones.service";

interface DataItem {
  Id: string;
  Codigo: number;
  Descripcion: string;
  Observacion: string;
}

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  isVisible = false;
  listOfData: DataItem[] = [];
  url = 'zonas';

  constructor(
    private zonesService: ZonesService,
    private metersService: MetersService
  ) { }

  ngOnInit(): void {
    this.GetZones();
    
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
    this.zonesService.GetZones().subscribe( 
      (result:any) => {
        console.log(result);
        result.Id = Number(result.Id);
        this.listOfData = result;
      }
    );
  }
  DeleteZone(Id: any){
    Id = Number(Id);
    this.metersService.DeleteMeter(Id, this.url).subscribe(
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
      sortFn: (a: DataItem, b: DataItem) => a.Codigo - b.Codigo,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Descripcion',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.Descripcion.localeCompare(b.Descripcion),
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
