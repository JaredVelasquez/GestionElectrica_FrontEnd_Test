import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';

@Component({
  selector: 'app-modal-medidores',
  templateUrl: './modal-medidores.component.html',
  styleUrls: ['./modal-medidores.component.css']
})
export class ModalMedidoresComponent implements OnInit {
  inputValue: string = 'my site';
  isVisible = false;
  validateForm!: FormGroup;
  listOfData: any[] = [];
  list: any[] = [];
  options = [
    { label: 'Fecha Contrato', value: 'Fecha Contrato' },
    { label: 'Especifica', value: 'Especifica' }
  ];
  options2 = [
    { label: 'Si', value: 'example' },
    { label: 'No', value: 'example' }
  ];
  

  constructor(
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    console.log(this.list);
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

  Post(): void{

  }


  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo Medidor',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: 'descend',
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
