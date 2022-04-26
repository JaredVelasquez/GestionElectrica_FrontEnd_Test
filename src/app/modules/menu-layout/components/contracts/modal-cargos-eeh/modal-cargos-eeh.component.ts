import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { EEHSchema } from 'src/Core/interfaces/eeh-invoice';
import { endOfMonth } from 'date-fns';
import { InvoiceChargeTypeSchema } from 'src/Core/interfaces/charge-type-invoices.interface';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';

@Component({
  selector: 'app-modal-cargos-eeh',
  templateUrl: './modal-cargos-eeh.component.html',
  styleUrls: ['./modal-cargos-eeh.component.css']
})
export class ModalCargosEehComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: EEHSchema;
  listOfData!: InvoiceChargeTypeSchema[];
  listOfDataAux!: InvoiceChargeTypeSchema[];
  IsDisable: boolean = false;
  editIsActive: boolean = false;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

  url = {
    get: "tipo-cargo-factura-manuals",
  }

  constructor(private fb: FormBuilder,
    private globalService: EndPointGobalService
    ) {}

  ngOnInit(): void {
    this.CleanForm();
    this.GetTipoCargosFacturaManual();
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

  CleanForm(): void {
    this.validateForm = this.fb.group({
      nombre: ["", [Validators.required]],
      valor: ["", [Validators.required]],
    });
  }

  GetTipoCargosFacturaManual(): void{
    this.globalService.Get(this.url.get).subscribe(
      (result: any) => {
        this.listOfData = [... result];
      }
    );
  }

  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Valor',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.fechaEmision.localeCompare(b.fechaEmision),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];
}
