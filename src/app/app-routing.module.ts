import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren:() => import('@modules/auth/auth.module').then((m) => m.AuthModule),

  },
  { path: '', 
    pathMatch: 'full', 
    redirectTo: '/sys' 
  },
  { 
    path: 'sys', 
    loadChildren: () => import('@modules/menu-layout/menu-layout.module').then(m => m.MenuLayoutModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
