import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { endOfMonth } from 'date-fns';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ContractMeterInterface, ContractMeterSchema } from 'src/Core/interfaces/contract-meter.interface';
import { ZoneShema } from 'src/Core/interfaces/zones.interface';
import { RatesInterface } from 'src/Core/interfaces/Rates.interface';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';
import { NotificationService } from '@shared/services/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-medidores',
  templateUrl: './modal-medidores.component.html',
  styleUrls: ['./modal-medidores.component.css']
})
export class ModalMedidoresComponent implements OnInit, OnChanges {
  @Input() dataPosition!: ContractInterface;
  @Input() listOfZones: ZoneShema[] = [];
  @Input() listOfRates: RatesInterface[] = [];
  @Input() listOfMeters: MeterSchema[] = [];
  localPosition!: ContractMeterInterface;
  inputValue: string = 'my site';
  listOfData: ContractMeterInterface[] = [];
  listOfDataAux: ContractMeterInterface[] = [];
  newCMeterSchema!: any;
  isVisible = false;
  IsDisable: boolean= false;
  editIsActive: boolean = false;
  dates!:any[];
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  validateForm!: FormGroup;
  url = {
    get: 'get-c-meter',
    post: 'contratos-medidores',
    delete: 'contratos-medidores',
    update: 'contratos-medidores',
  };
  

  constructor(
    private fb: FormBuilder,
    private globalService: EndPointGobalService,
    private notificationService: NotificationService,
    private nzMessageService: NzMessageService,
    ) { }

  ngOnInit(): void {
    this.cleanForm();
    this.getContractMeter(1, false);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.dataPosition){
      this.validateForm = this.fb.group({
        medidorId: ['', [Validators.required]],
        tarifaId: ['', [Validators.required]],
        zonaId: ['', [Validators.required]],
        contratoId: [this.dataPosition.id, [Validators.required]],
        fecha: [[this.dataPosition.fechaCreacion, this.dataPosition.fechaVenc.toString()], [Validators.required]],
        observacion: ['', [Validators.required]],
      })
      this.dates = [this.dataPosition.fechaCreacion, this.dataPosition.fechaVenc];
    }
    
    
    
  }
  showModal(): void {
    this.editIsActive = false;
    this.cleanForm();    
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getContractMeter(estado: number, switched: boolean):void{
    this.listOfDataAux.length = 0;
    if(switched){
      if(estado == 0)
        this.IsDisable = true;
      else
        this.IsDisable = false;
    }
    this.globalService.GetId(this.url.get ,estado).subscribe(
      (result: any) => {
        
        this.listOfDataAux = [... result];
        this.filterData();

      }
    )
    
      
  }

  filterData(){
    this.listOfData.length = 0;
    for(let i=0; i< this.listOfDataAux.length; i++){
      if(this.listOfDataAux[i].contratoId === this.dataPosition.id){
        this.listOfData = [... this.listOfData, this.listOfDataAux[i]];
      }
    }
    this.listOfData = [... this.listOfData];
    console.log(this.listOfData);
    
  }

  submitForm(estado: boolean):void{
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
      this.newCMeterSchema.estado = true;
      this.globalService.Post(this.url.post, this.newCMeterSchema).subscribe(
        (result:any) => { 
          if(result){
            this.getContractMeter(1, false);
            this.cleanForm();
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
          }else{
            this.notificationService.createMessage('error', 'La accion fallo 😓');
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
      this.newCMeterSchema.estado = this.localPosition.estado;
      this.globalService.PutId( this.url.post, this.localPosition.contratoMedidorId, this.newCMeterSchema).subscribe(
        (result:any) => {
          console.log(result);
          if(!result){
            if(this.localPosition.estado)
              this.getContractMeter(1, false);
            else
              this.getContractMeter(0, false);

            this.cleanForm();
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
          }else{
            this.notificationService.createMessage('error', 'La accion fallo 😓');
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

  updateTable(data: any){
    this.listOfData.length = 0;
    
    for(let i = 0; i < this.listOfDataAux.length; i++){
      if(this.listOfDataAux[i].contratoMedidorId === data.contratoMedidorId){
        this.listOfDataAux[i].zonaId = this.validateForm.value.zonaId;
        this.listOfDataAux[i].medidorId = this.validateForm.value.medidorId;
        this.listOfDataAux[i].tarifaId = this.validateForm.value.tarifaId;
        this.listOfDataAux[i].fechaInicial = this.validateForm.value.fecha[0];
        this.listOfDataAux[i].fechaFinal = this.validateForm.value.fecha[1];
      }
    }
    
    this.listOfData =  [... this.listOfDataAux];
    console.log( this.listOfDataAux);
    
    
  }

  fullSchema(): void{
    const {medidorId, tarifaId, zonaId, contratoId, observacion, estado} = this.validateForm.value;


    this.newCMeterSchema = {
      ... {medidorId, tarifaId, zonaId, contratoId, observacion, estado},
      fechaInicial: this.validateForm.value.fecha[0],
      fechaFinal: this.validateForm.value.fecha[1],
    }
  }

  disable(data: ContractMeterInterface, estado: boolean): void{
    this.globalService.Patch(this.url.update, data.contratoMedidorId, {estado: estado}).subscribe(
      result => {
        
        if(!result){
          if(estado === true){
            this.getContractMeter(0, false);
          }else{
            this.getContractMeter(1, false);
          }

        }
      }
    );
    
  }

  editableForm(data: ContractMeterInterface):void{
    console.log(data);
    
    this.localPosition = data;
    
    this.validateForm = this.fb.group({
      medidorId: [data.medidorId, [Validators.required]],
      tarifaId: [data.tarifaId, [Validators.required]],
      zonaId: [data.zonaId, [Validators.required]],
      contratoId: [this.dataPosition.id, [Validators.required]],
      fecha: [[data.fechaInicial.toString(), data.fechaFinal.toString()], [Validators.required]],
      observacion: [data.observacion, [Validators.required]],
    })
    this.editIsActive = true;
  }

  cleanForm(){
    this.validateForm = this.fb.group({
      medidorId: ['', [Validators.required]],
      tarifaId: ['', [Validators.required]],
      zonaId: ['', [Validators.required]],
      contratoId: [this.dataPosition.id, [Validators.required]],
      fecha: [[this.dataPosition.fechaCreacion.toString(), this.dataPosition.fechaVenc.toString()], [Validators.required]],
      observacion: ['', [Validators.required]],
    })
    this.editIsActive = false;
  }

  
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo Medidor',
      sortOrder: 'descend',
      sortFn: (a: ContractMeterInterface, b: ContractMeterInterface) => a.codigoMedidor.localeCompare(b.codigoMedidor),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Inicial',
      sortOrder: 'descend',
      sortFn: (a: ContractMeterInterface, b: ContractMeterInterface) => a.fechaInicial.localeCompare(b.fechaInicial),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Fecha Final',
      sortOrder: 'descend',
      sortFn: (a: ContractMeterInterface, b: ContractMeterInterface) => a.fechaFinal.localeCompare(b.fechaFinal),
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    }
  ];

}
