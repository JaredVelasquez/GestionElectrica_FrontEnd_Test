import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ColumnItem } from 'src/Core/interfaces/col-meter-table.interface';
import { RollOverSchema } from 'src/Core/interfaces/roll-over.interface';
import { endOfMonth } from 'date-fns';
import { toBoolean, toNumber } from 'ng-zorro-antd/core/util';
import { MeterSchema } from 'src/Core/interfaces/meter.interface';

@Component({
  selector: 'app-roll-over-modal',
  templateUrl: './roll-over-modal.component.html',
  styleUrls: ['./roll-over-modal.component.css']
})
export class RollOverModalComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: MeterSchema;
  newRollOver!: RollOverSchema;
  ListOfRollOver: RollOverSchema[] = [];
  dates:{from: any, to: any} = {from: '', to: ''};
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

  onChange(result: Date[]): void {
    this.dates = {
      from: result[0],
      to: result[1]
    }
    console.log(this.dates);
  }
  
  url = { 
    get: 'roll-overs',
    post: 'roll-overs',
    update: 'roll-overs'
  }
  EmptyForm = this.fb.group({
    medidorId: [ '', [Validators.required]],
    energia: [ '', [Validators.required]],
    lecturaAnterior: ['', [Validators.required]],
    lecturaNueva: ['', [Validators.required]],
    observacion: [''],
  });

  constructor(
    private globalService: EndPointGobalService,
    private fb: FormBuilder,
    ) {}

  submitForm(): void{
    
    if (this.validateForm.valid) {
      this.validateForm.value.energia = toBoolean(this.validateForm.value.energia);
      this.validateForm.value.medidorId = toNumber(this.validateForm.value.medidorId);
      this.newRollOver = {
        ... this.validateForm.value,
        fechaInicial: this.dates.from,
        fechaFinal: this.dates.to,
        estado: true
      }
      console.log(this.newRollOver);
      this.globalService.Post(this.url.post, this.newRollOver).subscribe(
        (result:any) => {
          if(result){
            // result.fechaFinal = formatDate(result.fechaFinal, 'dd/M/yyyy', '');
            // result.fechaInicial = formatDate(result.fechaInicial, 'dd/M/yyyy', '');
            this.ListOfRollOver.push(result);
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

  GetRollOver(){
    this.globalService.Get(this.url.get).subscribe(
      (result: any) => {
        this.ListOfRollOver = result;
      }
    );
  }

  
  cleanForm(): void{
    this.validateForm = this.fb.group({
      medidorId: [this.dataPosition.id],
      energia: [ '', [Validators.required]],
      lecturaAnterior: ['', [Validators.required]],
      lecturaNueva: ['', [Validators.required]],
      observacion: [''],
    });
  }

  ngOnInit(): void {
    this.validateForm = this.EmptyForm;
    this.GetRollOver();
    
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
      name: 'Fecha inicial',
      sortOrder: null,
      sortFn: (a: RollOverSchema, b: RollOverSchema) => (String(a.fechaInicial)).localeCompare(String(b.fechaInicial)),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: RollOverSchema) => list.some(codigo => (String(item.fechaInicial)).indexOf(codigo) !== -1)
    },
    {
      name: 'FechaFinal',
      sortOrder: null,
      sortFn: (a: RollOverSchema, b: RollOverSchema) =>(String(a.fechaFinal)).localeCompare(String(b.fechaFinal)),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: RollOverSchema) => list.some(codigo => (String(item.fechaFinal)).indexOf(codigo) !== -1)
    },
    {
      name: 'Ultima lectura',
      sortOrder: null,
      sortFn:  (a: RollOverSchema, b: RollOverSchema) => a.lecturaAnterior - (b.lecturaAnterior),
      sortDirections: [],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Nueva Lectura',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: RollOverSchema, b: RollOverSchema) => a.lecturaNueva - (b.lecturaNueva),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Energia',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: RollOverSchema, b: RollOverSchema) => Number(a.energia) - Number(b.energia),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    }
  ];
}