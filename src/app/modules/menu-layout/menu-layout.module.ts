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
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';



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
import { ModalMedidoresComponent } from './components/contracts/modal-medidores/modal-medidores.component';
import { ModalNewContractComponent } from './components/contracts/modal-new-contract/modal-new-contract.component';
import { ModalNewParameterComponent } from './components/input-parameters/modal-new-parameter/modal-new-parameter.component';
import { ModalNewChargeComponent } from './components/especial-charges/modal-new-charge/modal-new-charge.component';
import { ModalNewMatrixComponent } from './components/energy-matrix/modal-new-matrix/modal-new-matrix.component';
import { ModalDistributionComponent } from './components/energy-matrix/modal-distribution/modal-distribution.component';
import { ModalNewRateComponent } from './components/rates/modal-new-rate/modal-new-rate.component';
import { ModalNewInvoicesComponent } from './components/generated-invoices/modal-new-invoices/modal-new-invoices.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ClientsComponent,
    ProvidersComponent,
    ZonesComponent,
    MetersComponent,
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
    ModalParametersComponent,
    ModalMedidoresComponent,
    ModalNewContractComponent,
    ModalNewParameterComponent,
    ModalNewChargeComponent,
    ModalNewMatrixComponent,
    ModalDistributionComponent,
    ModalNewRateComponent,
    ModalNewInvoicesComponent
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
    NzDatePickerModule,
    NzSwitchModule,
    NzInputNumberModule
  ],
  bootstrap: [MainPageComponent],
})
export class MenuLayoutModule { }
