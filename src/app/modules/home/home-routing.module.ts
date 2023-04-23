import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //reportes
  {
    path: '',
    loadChildren: () => import("./bienvenida-home/bienvenida-home.module").then(m => m.BienvenidaHomeModule)
  },
   //login
   {
    path: 'Auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
   //register
   {
    path: 'register-usr',
    loadChildren: () => import("./register-usr/register-usr.module").then(m => m.RegisterUsrModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
