import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';

interface DataItemTest {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-modal-parameters',
  templateUrl: './modal-parameters.component.html',
  styleUrls: ['./modal-parameters.component.css']
})
export class ModalParametersComponent implements OnInit {
  isVisible2 = false;
  listOfDataModal: DataItemTest[] = [];
  @Input() ListOfData: any[] = [];
  @Output() ListOfDataUpdated = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`
        });
      }
      this.listOfDataModal = data;

      console.log(this.ListOfData);
      
  }

  UpdateListOfData(list: any){
    console.log('Button ok clicked!');
    this.isVisible2 = false;
    this.ListOfDataUpdated.emit(list);
  }

  showModal2(): void {
    this.isVisible2 = true;
  }

  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
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
