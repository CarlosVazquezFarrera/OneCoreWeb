import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
   url: string = "http://192.168.114.2:45455/weatherforecast";
   constructor(private http: HttpClient) {}

   login(usuario: UsuarioModel){
     return this.http.get(
       `${this.url}/Login?User=${usuario.User}&Password=${usuario.Password}`
     );
   }

   isLogged(): boolean{
     return localStorage.getItem('Token')? true: false;
   }

   logOut(){
     localStorage.removeItem('Token');
   }
}
