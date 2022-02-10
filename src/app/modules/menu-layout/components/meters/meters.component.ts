import { Component, OnInit } from '@angular/core';
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
  dataList: Array<{ name: string; age: number; address: string }> = [];
  titleList: object[] = [{name: '#'}, {name: 'Codigo'}, {name: 'Descripcion'}, {name: 'Tipo'}, 
    {name: 'Modelo'}, {name: 'Serie'}
  ];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataList.push({
        name: `Edward King`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }

}
