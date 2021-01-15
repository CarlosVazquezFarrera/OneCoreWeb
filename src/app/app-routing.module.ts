import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'registro', component: RegistroComponent },
  { path:'**', pathMatch: 'full', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
