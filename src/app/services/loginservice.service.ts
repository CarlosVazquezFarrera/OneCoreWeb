import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  //#region Constructor
  constructor(private http: HttpClient) {
    this.urlApi = `${environment.urlApi}Login/`; 
  }
  //#endregion
  
  //#region Atributos
  urlApi: string;
  //#endregion
  
  //#region Métodos
   login(usuario: Usuario){
     return this.http.get(
       `${this.urlApi}Login?Correo=${usuario.correo}&Password=${usuario.password}`
     );
   }
   //#endregion
   isLogged(): boolean{
     return localStorage.getItem('Token')? true: false;
   }

   logOut(){
     localStorage.removeItem('Token');
   }
}
