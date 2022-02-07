import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopConfirmComponent } from './pop-confirm/pop-confirm.component';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';



@NgModule({
  declarations: [
    PopConfirmComponent
  ],
  exports: [
    PopConfirmComponent
  ],
  imports: [
    CommonModule,
    NzPopconfirmModule
    
  ]
})
export class SharedModule { }
