import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'home', component: HomeComponent },
  { path:'registro', component: RegistroComponent },
  { path:'perfil', component: PerfilComponent },
  { path:'**', pathMatch: 'full', redirectTo:'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
