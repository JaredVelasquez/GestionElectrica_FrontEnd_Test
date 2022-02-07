import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuLayoutPageComponent } from './pages/menu-layout-page/menu-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLayoutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLayoutRoutingModule { }
