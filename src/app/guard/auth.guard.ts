import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { SessionstorageserviceService } from '../services/sessionstorageservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionstorageserviceService ,
              private router: Router){}
  canActivate(): boolean{

    if (this.sessionService.Islogged()){
      return true;
    }
    else{
      this.router.navigateByUrl('login');
      return false;
    }
  }
  
}
