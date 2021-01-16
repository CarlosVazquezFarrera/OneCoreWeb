import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionstorageserviceService } from '../services/sessionstorageservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedguardGuard implements CanActivate {
  constructor(private sessionService: SessionstorageserviceService ,
              private router: Router){}
  canActivate(): boolean{

    if (this.sessionService.Islogged()){
      this.router.navigateByUrl('home');
      return false;
    }
    else{
      
      return true;
    }
  }
  
}
