import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';

@Component({
  selector: 'app-modal-parameters',
  templateUrl: './modal-parameters.component.html',
  styleUrls: ['./modal-parameters.component.css']
})
export class ModalParametersComponent implements OnInit {
  @Input() ListOfData: any[] = [];
  @Input() dataPosition !: RatesInterface;
  isVisible2 = false;
  listOfDataModal: RatesInterface[] = [];
  ListOfCharges: any[] = [];
  validateForm!: FormGroup;

  url = {
    get: 'get-parameter',
    getcargo: 'tipo-cargos',
    post: 'parametro-tarifas',
    delete: 'parametro-tarifas',
    update: 'parametro-tarifas',
  };


  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.Get();  
    this.GetCargo();
    
    this.validateForm = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    })
  }

  DataPosition(data: any){
    console.log(data);
    
  }

  Get(){
    this.globalService.GetId(this.url.get, this.dataPosition.id).subscribe(
      (result: any) => {
        this.ListOfData = result;
      }
    );
  }

  GetCargo(){
    this.globalService.Get(this.url.getcargo).subscribe(
      (result: any) => {
        this.ListOfCharges = result;
      }
    );
  }

  Post(): void{
    console.log(this.validateForm.value);
    console.log(this.dataPosition.id);
    
    if (this.validateForm.valid) {
      const provider = {
        tarifaId: this.dataPosition.id,
        tipoCargoId: Number(this.validateForm.value.cargo),
        fechaInicio:  this.validateForm.value.fechaInicio,
        fechaFinal:  this.validateForm.value.fechaFinal,
        valor:  this.validateForm.value.valor,
        observacion:  this.validateForm.value.observacion,
        estado: true,
      }
      console.log(provider);
      this.globalService.Post(this.url.post, provider).subscribe(
        (result:any) => {
          if(result){
            console.log(result);
            
            this.Get();
            
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
  showModal2(): void {
    this.isVisible2 = true;
  }

  handleOk2(): void {
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    this.isVisible2 = false;
  }

  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Cargo',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Valor',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.id - b.id,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: 'descend',
      sortFn: (a: RatesInterface, b: RatesInterface) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];

}
