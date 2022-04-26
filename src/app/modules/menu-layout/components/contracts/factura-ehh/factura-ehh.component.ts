import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { endOfMonth } from 'date-fns';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { EEHSchema } from 'src/Core/interfaces/eeh-invoice';

@Component({
  selector: 'app-factura-ehh',
  templateUrl: './factura-ehh.component.html',
  styleUrls: ['./factura-ehh.component.css']
})
export class FacturaEHHComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: ContractInterface;
  listOfData!: EEHSchema[];
  listOfDataAux!: EEHSchema[];
  IsDisable: boolean = false;
  editIsActive: boolean = false;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  url = {
    get: "factura-manuals",
  }
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

    this.GetFacturas();
  }

  showModal(): void {
    this.isVisible = true;
  }

  GetFacturas(){

    this.globalService.Get(this.url.get).subscribe(
      (result: any) => {
        this.listOfDataAux = [... result];
        this.listOfData = [... result];
        console.log(this.listOfData);
        
      }
    );
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
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: EEHSchema, b: EEHSchema) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Emision',
      sortOrder: null,
      sortFn: (a: EEHSchema, b: EEHSchema) => a.fechaEmision.localeCompare(b.fechaEmision),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Vencimiento',
      sortOrder: null,
      sortFn: (a: EEHSchema, b: EEHSchema) => a.fechaVencimiento.localeCompare(b.fechaVencimiento),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: null,
      sortFn:  (a: EEHSchema, b: EEHSchema) => a.fechaInicial.localeCompare(b.fechaInicial),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: null,
      sortFn: (a: EEHSchema, b: EEHSchema) => a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];

}
