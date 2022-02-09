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

@NgModule({
  declarations: [
    HomeComponent,
    MainPageComponent,
    ClientsComponent,
    ProvidersComponent,
    ZonesComponent,
    MetersComponent
  ],
  imports: [
    CommonModule,
    MenuLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    SharedModule,
    NzTableModule
  ],
  bootstrap: [MainPageComponent]
})
export class MenuLayoutModule { }
