import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioserviceService {

  //#region  Constructor
  constructor(private http: HttpClient) {
    this.urlApi = `${environment.urlApi}Usuario/`; 
    console.log(this.urlApi);
   }
  //#endregion

  //#region Atributos
  urlApi: string;
  //#endregion

  //#region  Métodos

  obtenerUsuarios(){
    return this.http.get(`${this.urlApi}ObtenerUsuarios`);
  }

  //#endregion
}
