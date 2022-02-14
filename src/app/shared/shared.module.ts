import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';

import { IconsProviderModule } from 'src/app/icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MetersTableComponent } from './components/meters-table/meters-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    MenuLayoutComponent,
    MetersTableComponent
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
    NzGridModule
  ],
  exports: [
    MenuLayoutComponent,
    MetersTableComponent
  ]
})
export class SharedModule { }
