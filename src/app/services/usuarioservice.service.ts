import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuarioserviceService {

  //#region  Constructor
  constructor(private http: HttpClient) {
    this.urlApi = `${environment.urlApi}Usuario/`; 
   }
  //#endregion

  //#region Atributos
  urlApi: string;
  //#endregion

  //#region  Métodos

  obtenerUsuarios(){
    return this.http.get(`${this.urlApi}ObtenerUsuarios`);
  }

  actualizarUsuario(usuario: Usuario){
    return this.http.patch(`${this.urlApi}ActualizarUsuario`, usuario, httpOptions);
  }
  //#endregion
}
