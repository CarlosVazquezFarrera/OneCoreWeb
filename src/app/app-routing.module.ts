import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginguardGuard } from './guard/loginguard.guard';
import { LoggedguardGuard } from './guard/loggedguard.guard';


const routes: Routes = [
  { path:'login', component: LoginComponent, canActivate: [LoginguardGuard] },
  { path:'home', component: HomeComponent, canActivate: [LoggedguardGuard] },
  { path:'registro', component: RegistroComponent, canActivate: [LoginguardGuard] },
  { path:'perfil', component: PerfilComponent, canActivate: [LoggedguardGuard]},
  { path:'**', pathMatch: 'full', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
