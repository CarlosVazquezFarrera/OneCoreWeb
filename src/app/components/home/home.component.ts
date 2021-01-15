import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginserviceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.logOut();
    this.router.navigateByUrl('login');
  }

}
