import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { endOfMonth } from 'date-fns';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

@Component({
  selector: 'app-factura-ehh',
  templateUrl: './factura-ehh.component.html',
  styleUrls: ['./factura-ehh.component.css']
})
export class FacturaEHHComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: ContractInterface;
  listOfData!: any;
  IsDisable: boolean = false;
  editIsActive: boolean = false;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  
  constructor(
    private fb: FormBuilder,
    private globalService: EndPointGobalService
    ) { }


  ngOnInit(): void {
    this.cleanForm();
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  showModal(): void {
    this.isVisible = true;
  }

  editableForm(){
  }

  cleanForm(){
    this.validateForm = this.fb.group({
      fechaVencimiento: ['', [Validators.required]],
      fechaFacturacion: ['', [Validators.required]],
      consumoEnergeticoKwh: ['', [Validators.required]],
      tarifaId: ['', [Validators.required]],
      totalCostoEnergia: ['', [Validators.required]],
      cargoId: ['', [Validators.required]],
      totalCargos: ['', [Validators.required]],
    })
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Fecha Facturacion',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Vencimiento',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Consumo Kwh',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Tarifa',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.fechaCreacion.localeCompare(b.fechaCreacion),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Total Energia Lps.',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.fechaVenc.localeCompare(b.fechaVenc),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Total Cargos Lps.',
      sortOrder: null,
      sortFn: (a: ContractInterface, b: ContractInterface) => a.fechaVenc.localeCompare(b.fechaVenc),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
