import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuLayoutRoutingModule } from './menu-layout-routing.module';
import { MenuLayoutPageComponent } from './pages/menu-layout-page/menu-layout-page.component';
import { HomeComponent } from './components/home/home.component';

//layout
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from '../../icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MenuLayoutPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MenuLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule
  ],
  bootstrap: [MenuLayoutPageComponent]
})
export class MenuLayoutModule { }
