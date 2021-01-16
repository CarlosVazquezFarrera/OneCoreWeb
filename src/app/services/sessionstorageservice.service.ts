import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageserviceService {

  constructor() { }
  SetLogin():void{
    sessionStorage.setItem('Logged', 'True');
  }
  SetUsuario(usuario: Usuario):void{
    sessionStorage.setItem('Usuario', JSON.stringify(usuario));    
  }
  GetUsuario(): Usuario{
    return  JSON.parse(sessionStorage.getItem('Usuario'));
  }

  RemoveUsuario():void{
    sessionStorage.removeItem('Usuario');
  }
  Islogged(): boolean{ 
    return sessionStorage.getItem('Logged')? true: false;
  }

  RemoveLogin(): void{
    sessionStorage.removeItem('Logged');
  }

  LogOut():void{
    this.RemoveUsuario();
    this.RemoveLogin();
  }
}
