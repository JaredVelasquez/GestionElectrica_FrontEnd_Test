import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';

import { IconsProviderModule } from 'src/app/icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzFormModule } from 'ng-zorro-antd/form';
import { DigitalInvoiceComponent } from './components/digital-invoice/digital-invoice.component';

//import graphics module
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    MenuLayoutComponent,
    DigitalInvoiceComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzRadioModule,
    FusionChartsModule
  ],
  exports: [
    MenuLayoutComponent,
    NzFormModule,
    DigitalInvoiceComponent
  ]
})
export class SharedModule { }
