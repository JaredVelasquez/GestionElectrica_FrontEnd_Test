import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuLayoutRoutingModule } from './menu-layout-routing.module';
import { HomeComponent } from './components/home/home.component';

//layout
import { IconsProviderModule } from '../../icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';


import { SharedModule } from "@shared/shared.module";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ZonesComponent } from './components/zones/zones.component';
import { MetersComponent } from './components/meters/meters.component';
import { MetersTableComponent } from "./components/meters/meters-table/meters-table.component";
import { MetersModalComponent } from "./components/meters/meters-modal/meters-modal.component";
import { VirtualMeterModalComponent } from "./components/meters/virtual-meter-modal/virtual-meter-modal.component";

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatesComponent } from './components/rates/rates.component';
import { InputParametersComponent } from './components/input-parameters/input-parameters.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { EnergyMatrixComponent } from './components/energy-matrix/energy-matrix.component';
import { EspecialChargesComponent } from './components/especial-charges/especial-charges.component';
import { GeneratedInvoicesComponent } from './components/generated-invoices/generated-invoices.component';
import { IssuedInvoicesComponent } from './components/issued-invoices/issued-invoices.component';
import { CancelledInvoicesComponent } from './components/cancelled-invoices/cancelled-invoices.component';
import { ModalParametersComponent } from './components/rates/modal-parameters/modal-parameters.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ClientsComponent,
    ProvidersComponent,
    ZonesComponent,
    MetersComponent,
    MetersTableComponent,
    MetersModalComponent,
    VirtualMeterModalComponent,
    RatesComponent,
    InputParametersComponent,
    ContractsComponent,
    EnergyMatrixComponent,
    EspecialChargesComponent,
    GeneratedInvoicesComponent,
    IssuedInvoicesComponent,
    CancelledInvoicesComponent,
    ModalParametersComponent
  ],
  imports: [
    CommonModule,
    MenuLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    SharedModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzRadioModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzAvatarModule,
    NzUploadModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  bootstrap: [MainPageComponent],
  providers:[
    MetersTableComponent,
  ]
})
export class MenuLayoutModule { }
