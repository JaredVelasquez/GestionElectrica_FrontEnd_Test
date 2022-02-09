import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';

import { IconsProviderModule } from 'src/app/icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TableComponent } from './components/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    MenuLayoutComponent,
    TableComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule
  ],
  exports: [
    MenuLayoutComponent,
    TableComponent
  ]
})
export class SharedModule { }
