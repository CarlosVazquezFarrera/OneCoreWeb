import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { LoginserviceService } from '../services/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginserviceService,
              private router: Router){}
  canActivate(): boolean{

    if (this.loginService.isLogged()){
      return true;
    }
    else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
