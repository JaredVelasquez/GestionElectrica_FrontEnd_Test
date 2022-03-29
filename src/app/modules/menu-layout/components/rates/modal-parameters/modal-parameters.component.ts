import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { InputParametersInterface, InputParamSchema } from "src/Core/interfaces/input-parameters.interface";
import { ChargesInterface } from 'src/Core/interfaces/charges.interface';
import { endOfMonth } from 'date-fns';

@Component({
  selector: 'app-modal-parameters',
  templateUrl: './modal-parameters.component.html',
  styleUrls: ['./modal-parameters.component.css']
})
export class ModalParametersComponent implements OnInit, OnChanges {
  ListOfData: InputParametersInterface[] = [];
  @Input() dataPosition !: RatesInterface;
  @Input() listOfParamRelation : InputParametersInterface[] = [];
  newParam!: InputParametersInterface | InputParamSchema;
  ListOfCharges: ChargesInterface[] = [];
  isVisible = false;
  editIsActive!: InputParametersInterface | undefined;
  paramIsDisable: boolean = false;
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

  validateForm!: FormGroup;

  EmptyForm = this.fb.group({
    fecha: ['', [Validators.required]],
    cargoId: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
  })

  url = {
    get: 'get-parameter',
    getcargo: 'tipo-cargos',
    post: 'parametro-tarifa',
    update: 'tarifa-parametro-detalles',
  };

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { 
    this.GetCargo();
    this.GetParams(true, false); 
    this.validateForm = this.EmptyForm;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetParams(true, false); 
    
  }

  GetCargo(){
    this.globalService.Get(this.url.getcargo).subscribe(
      (result: any) => {
        this.ListOfCharges = result;
        console.log(result);
        
      }
    );
  }


  
  GetParams(estado: boolean, switched: boolean){
    if(switched){
      this.ListOfData.length = 0;
      for(let i = 0; i < this.listOfParamRelation.length ; i++){
        if(this.dataPosition.id === this.listOfParamRelation[i].tarifaId && this.listOfParamRelation[i].estado === estado){
          this.ListOfData.push(this.listOfParamRelation[i]);
        }
      }
      if((!this.paramIsDisable) && estado === false){
        this.paramIsDisable = true;
      }else{
        this.paramIsDisable = false;
      }
    }else{
      this.ListOfData.length = 0;
      for(let i = 0; i < this.listOfParamRelation.length ; i++){
        if(this.dataPosition.id === this.listOfParamRelation[i].tarifaId && this.listOfParamRelation[i].estado === estado){
          this.ListOfData.push(this.listOfParamRelation[i]);
        }
      }
    }
    
  }
  
  disableRelation(param: InputParametersInterface, estado : boolean){
    this.globalService.Patch(this.url.update, param.id, {estado: estado}).subscribe(
      result => {
        if(!result){
          for(let i = 0; i < this.listOfParamRelation.length; i++){
            if(this.listOfParamRelation[i].id === param.id){
              this.listOfParamRelation[i].estado = estado;
            }
          }

          if(estado === true){
            this.GetParams(false, false);
          }else{
            this.GetParams(true, false);
          }

        }
      }
    );
  }

  submitPostParam(estado: boolean): void {
    if (this.validateForm.valid) {
        this.initializePostParam();
        this.globalService.Post(this.url.post, this.newParam).subscribe(
          (result:any) => {
            if(result){
              console.log(result);
              
              this.ListOfData.push(result);
              this.GetParams(estado, false);
              this.cleanForm();
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
  initializePostParam(): void{
    this.newParam = {
      idTarifa: this.dataPosition.id,
      ... this.validateForm.value,
      fechaInicio: this.validateForm.value.fecha[0],
      fechaFinal: this.validateForm.value.fecha[1],
      estado: true,
    }

  }

  submitEditableForm(dataEditable?: InputParametersInterface){    
    if (this.validateForm.valid) {
      if(dataEditable){
        const {valor, observacion} = this.validateForm.value;
        this.newParam = {
        ... {valor, observacion},
        id: dataEditable.idParametro,
        tipo: dataEditable.tipo,
        tipoCargoId: this.validateForm.value.cargoId,
        fechaInicio: this.validateForm.value.fecha[0],
        fechaFinal: this.validateForm.value.fecha[1],
        estado: dataEditable.estado,
        }
        
        dataEditable.cargoId = this.newParam.tipoCargoId;
        dataEditable.fechaFinal = this.newParam.fechaFinal;
        dataEditable.fechaInicio = this.newParam.fechaInicio;
        dataEditable.valor = this.newParam.valor;
        dataEditable.observacion = this.newParam.observacion;
        
        this.globalService.Patch(this.url.update, dataEditable.idParametro, this.newParam).subscribe(
          (result:any) => {
            if(!result){
              if(dataEditable)
              this.update(dataEditable, dataEditable.estado);
              this.cleanForm();
              this.editIsActive = undefined;
            }
          }
        );  
        
      }
  } else {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  }

  cleanForm(): void{
    this.validateForm = this.EmptyForm;
  }

  update(data: InputParametersInterface, estado: boolean): void{
    for(let i = 0; i < this.listOfParamRelation.length; i++){
      if(this.listOfParamRelation[i].id === data.id){
        this.listOfParamRelation[i] = {
          ... data
        }
      }
    }
    this.GetParams(estado, false)
  }

  editableForm(data: InputParametersInterface){

    this.validateForm = this.fb.group({
      fecha: [[data.fechaInicio.toString(), data.fechaFinal.toString()], [Validators.required]],
      cargoId: [data.cargoId, [Validators.required]],
      valor: [data.valor, [Validators.required]],
      observacion: [data.observacion, [Validators.required]],
    })
    this.editIsActive = data;
    
  }

  onChange(result: Date[]): void {
    this.dates = {
      from: result[0],
      to: result[1]
    }
    console.log(this.dates);
  }

  
  showModal(): void {
    this.validateForm = this.EmptyForm;
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
      listOfFilter:[],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: null,
      sortFn: (a: InputParametersInterface, b: InputParametersInterface)=> a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['ascend' ,'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
  ];

}
