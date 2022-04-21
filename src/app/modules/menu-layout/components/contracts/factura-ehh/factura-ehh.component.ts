import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContractInterface } from 'src/Core/interfaces/contracts.interface';

@Component({
  selector: 'app-factura-ehh',
  templateUrl: './factura-ehh.component.html',
  styleUrls: ['./factura-ehh.component.css']
})
export class FacturaEHHComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  @Input() dataPosition!: ContractInterface;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
  }

  editableForm(){
  }

  cleanForm(){
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
