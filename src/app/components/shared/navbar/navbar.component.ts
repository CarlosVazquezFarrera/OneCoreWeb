import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private sessionService: SessionstorageserviceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
   this.sessionService.LogOut();
    this.router.navigateByUrl('login');
  }

  perfil(): void{
    this.router.navigateByUrl('perfil');
  }
}
