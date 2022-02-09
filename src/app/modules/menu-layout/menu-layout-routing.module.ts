import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ClientsComponent } from "./components/clients/clients.component";
import { ProvidersComponent } from "./components/providers/providers.component";
import { ZonesComponent } from "./components/zones/zones.component";
import { MetersComponent } from "./components/meters/meters.component";


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children:
     [
      {
        path: 'welcome',
        component: HomeComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'providers',
        component: ProvidersComponent
      },
      {
        path: 'zones',
        component: ZonesComponent
      },
      {
        path: 'meters',
        component: MetersComponent
      }
     ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLayoutRoutingModule { }
