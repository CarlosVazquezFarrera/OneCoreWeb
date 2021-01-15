import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageserviceService {

  constructor() { }

  SetLogin():void{
    sessionStorage.setItem('Logged', 'True');
  }

  Islogged(): boolean{ 
    return sessionStorage.getItem('Logged')? true: false;
  }
}
