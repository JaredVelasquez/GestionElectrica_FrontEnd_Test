import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { EEHSchema } from 'src/Core/interfaces/eeh-invoice';
import { endOfMonth } from 'date-fns';
import { InvoiceChargeTypeSchema } from 'src/Core/interfaces/charge-type-invoices.interface';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ManualInvoiceDetailSchema, ManualInvoiceDetailView } from 'src/Core/interfaces/manual-invoice-detail.interface';
import { ManualInvoiceChargue } from 'src/Core/interfaces/manual-invoice-chargue.interface';

@Component({
  selector: 'app-modal-cargos-eeh',
  templateUrl: './modal-cargos-eeh.component.html',
  styleUrls: ['./modal-cargos-eeh.component.css']
})
export class ModalCargosEehComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: EEHSchema;
  listOfData: ManualInvoiceDetailView[] = [];
  @Input() listOfDataAux: ManualInvoiceDetailView[] = [];
  newCargo!: any;
  IsDisable: boolean = false;
  editIsActive: boolean = false;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  localPosition!: ManualInvoiceDetailView;
  total: number = 0;
  totalAux: number = 0;
  url = {
    get: "tipo-cargo-factura-manuals",
    getdetalle: "get-manual-invoices-detail",
    postCargo: "tipo-cargo-factura-manuals",
    post: "detalle-factura-manuals",
    update: "detalle-factura-manuals",
  }

  constructor(private fb: FormBuilder,
    private globalService: EndPointGobalService
    ) {}

  ngOnInit(): void {
    this.CleanForm();
    this.filterCargos(true, false);
    this.totalCargos();
  }
  GetManualInvoicesDetail(){
    this.globalService.Get(this.url.getdetalle).subscribe(
      (result: any) => {
        this.listOfDataAux = [... result];
      }
    );
  }

  submitForm():void{
    if(this.editIsActive){
      this.submitUpdateForm();
    }
    else{
      this.submitPostForm();
    }
  }

  submitPostForm(): void{
    
    if (this.validateForm.valid) {
      this.fullSchema();
      this.newCargo.estado = true;
      this.globalService.Post(this.url.postCargo, this.newCargo).subscribe(
        (result:any) => { 
          if(result){
            let relation = {
              facturaId: this.dataPosition.id,
              tipoCargoId: result.id,
              estado: true
            }
            this.globalService.Post(this.url.post, relation).subscribe(
              (result: any) => {
                if(result){
                  this.GetManualInvoicesDetail();
                }
              }
            );
          }
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  submitUpdateForm(): void{
    
    if (this.validateForm.valid) {
      this.fullSchema();
      this.newCargo.estado = this.localPosition.estado;
      this.globalService.PutId( this.url.post, this.localPosition.id, this.newCargo).subscribe(
        (result:any) => {
          console.log(result);
          if(!result){
            if(this.localPosition.estado){
              this.GetManualInvoicesDetail();
              this.filterCargos(true, false)
            }
            else{
              this.GetManualInvoicesDetail();
              this.filterCargos(false, false)

            }

            this.CleanForm();
          }
        }
        );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  fullSchema(): void{
    const {nombre, valor} = this.validateForm.value;

    this.newCargo = {
      ... {nombre, valor},
      estado: true,
    }
  }

  disable(data: ManualInvoiceDetailView, estado: boolean): void{
    this.globalService.Patch(this.url.update, data.id, {estado: estado}).subscribe(
      result => {
        
        if(!result){
          if(estado === true){
            this.GetManualInvoicesDetail();
            this.filterCargos(false, false)
          }else{
            this.GetManualInvoicesDetail();
            this.filterCargos(true, false);
          }

        }
      }
    );
    
  }

  editableForm(data: ManualInvoiceDetailView){
    
    this.validateForm = this.fb.group({
      nombre: [data.nombre, [Validators.required]],
      valor: [data.valor, [Validators.required]],
    });
    this.localPosition = data;
    this.editIsActive = true;
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
      valor: [0, [Validators.required]],
    });
  }

  GetTipoCargosFacturaManual(): void{
    this.globalService.Get(this.url.get).subscribe(
      (result: any) => {
        this.listOfData = [... result];
      }
    );
  }

  filterCargos(estado: boolean, switched: boolean){
    if(switched){
      if(estado == false)
        this.IsDisable = true;
      else
        this.IsDisable = false;
    }
      this.listOfData.length = 0;

    this.listOfData.length = 0;
    for(let i=0; i < this.listOfDataAux.length; i++){
      if(this.dataPosition.id === this.listOfDataAux[i].id  && this.listOfDataAux[i].estado === estado){
        this.listOfData = [... this.listOfData, this.listOfDataAux[i]];
      }
    }
    this.listOfData = [... this.listOfData];
    
  }

  totalCargos(){
    for(let i=0; i < this.listOfData.length; i++){
      this.total += this.listOfData[i].valor;
    }
  }

  UpdateTotalCargos(valor: any){
    this.total= 0;
    this.totalCargos();
    return this.total += valor;
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
