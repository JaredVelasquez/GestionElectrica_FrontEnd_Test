import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { InputParametersInterface } from "src/Core/interfaces/input-parameters.interface";

@Component({
  selector: 'app-modal-parameters',
  templateUrl: './modal-parameters.component.html',
  styleUrls: ['./modal-parameters.component.css']
})
export class ModalParametersComponent implements OnInit {
  ListOfData: InputParametersInterface[] = [];
  @Input() dataPosition !: RatesInterface;
  isVisible2 = false;
  listOfDataModal: any[] = [];
  ListOfCharges: any[] = [];
  validateForm!: FormGroup;
  filterFechaInicio : Array<{text: string, value: any}>  = [];
  filterFechaFinal : Array<{text: string, value: any}>  = [];
  currentAction : boolean = true;
  editableSchema !: InputParametersInterface | undefined;
  url = {
    get: 'get-parameter',
    getcargo: 'tipo-cargos',
    post: 'parametro-tarifa',
    delete: 'parametro-tarifas',
    update: 'parametro-tarifas',
  };

  action = {
    post: true,
    edit: false,
  }

  EmptyForm = this.fb.group({
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    cargo: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.Get();  
    this.GetCargo();
    
    
    this.validateForm = this.EmptyForm;

  }

  Get(){
    if(this.dataPosition.id){
      this.globalService.GetId(this.url.get, this.dataPosition.id).subscribe(
        (result: any) => {
          
          this.ListOfData = result;
      }
      );

    }
  }

  GetCargo(){
    this.globalService.Get(this.url.getcargo).subscribe(
      (result: any) => {
        this.ListOfCharges = result;
        console.log(result);
        
      }
    );
  }

  Post(): void{
    if (this.validateForm.valid) {
      if(this.currentAction){
        const providerPost = {
          idTarifa: this.dataPosition.id,
          cargoId: Number(this.validateForm.value.cargo),
          valor:  Number(this.validateForm.value.valor),
          fechaInicio:  this.validateForm.value.fechaInicio,
          fechaFinal:  this.validateForm.value.fechaFinal,
          observacion:  this.validateForm.value.observacion,
          estado: true,
        }
        console.log(providerPost);
        
        this.globalService.Post(this.url.post, providerPost).subscribe(
          (result:any) => {
              this.Get();
          }
        );
        this.EmptyForm = this.fb.group({
          fechaInicio: ['', [Validators.required]],
          fechaFinal: ['', [Validators.required]],
          cargo: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          observacion: ['', [Validators.required]],
        })
        this.CleanForm();
      }
      else{
        
      const providerUpdate = {
        tipoCargoId: Number(this.validateForm.value.cargo),
        fechaInicio:  this.validateForm.value.fechaInicio,
        fechaFinal:  this.validateForm.value.fechaFinal,
        valor:  this.validateForm.value.valor,
        observacion:  this.validateForm.value.observacion,
        tipo: this.editableSchema?.tipo,
        estado: true,
      }
        if(this.editableSchema){
          this.globalService.PutId(this.url.update, this.editableSchema.idParametro, providerUpdate).subscribe(
            (result:any) => {
                this.Get();
                this.CleanForm();
            }
          );  
          this.editableSchema = undefined;
          
        }
      }
      this.CleanForm();
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  
  Delete(Id: any){
    Id = Number(Id);
    this.globalService.Delete(this.url.delete, Id).subscribe(
      result => {
        console.log(result);
        
        this.Get();
      }
    );
  }

  SelectEdit(data: InputParametersInterface){
    this.currentAction = this.action.edit;
    data.cargoId = String(data.cargoId);
    this.editableSchema = data;
    this.validateForm = this.fb.group({
      fechaInicio: [data.fechaInicio, [Validators.required]],
      fechaFinal: [data.fechaFinal, [Validators.required]],
      cargo: [data.cargoId, [Validators.required]],
      valor: [data.valor, [Validators.required]],
      observacion: [data.observacion, [Validators.required]],
    })

    console.log(this.validateForm.value);
    

  }

  CleanForm(){
    this.currentAction = this.action.post;
    this.validateForm = this.EmptyForm;
    this.editableSchema = undefined;
  }

  showModal2(): void {
    this.getFilters();
    this.isVisible2 = true;
    this.currentAction = this.action.post;
  }

  handleOk2(): void {
    this.isVisible2 = false;
    this.currentAction = this.action.post;
  }

  handleCancel2(): void {
    this.isVisible2 = false;
    this.currentAction = this.action.post;
  }

  getFilters(): void {
    let fechaInicioAux: any[] = [];
    let fechaFinalAux: any[] = [];
    let filterAux: any[] = [];
    if(this.ListOfData){
      for(let i = 0 ; i < this.ListOfData.length ; i++){
        fechaInicioAux.push(this.ListOfData[i].fechaInicio);
        fechaFinalAux.push(this.ListOfData[i].fechaFinal);        
      }

      filterAux = [... new Set(fechaInicioAux)];
      for(let i = 0; i < filterAux.length; i++){
        this.filterFechaInicio.push({text: filterAux[i], value: filterAux[i]});      
      }      
      filterAux = [... new Set(fechaFinalAux)];      
      for(let i = 0; i < filterAux.length; i++){
        this.filterFechaFinal.push({text: filterAux[i], value: filterAux[i]});      
      }  
    }

  }
  
  
  listOfColumns: ColumnItem[] = [
    {
      name: 'Cargo',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Valor',
      sortOrder: null,
      sortFn: (a: InputParametersInterface, b: InputParametersInterface)=> a.valor - b.valor,
      sortDirections: ['ascend' ,'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: null,
      sortFn: (a: InputParametersInterface, b: InputParametersInterface)=> a.fechaInicio.localeCompare(b.fechaInicio),
      sortDirections: ['ascend' ,'descend', null],
      listOfFilter: this.filterFechaInicio,
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: null,
      sortFn: (a: InputParametersInterface, b: InputParametersInterface)=> a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['ascend' ,'descend', null],
      listOfFilter: this.filterFechaFinal,
      filterFn: null,
      filterMultiple: true
    },
  ];

}
