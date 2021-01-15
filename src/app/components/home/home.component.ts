import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sessionService: SessionstorageserviceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.sessionService.RemoveLogin();
    this.router.navigateByUrl('login');
  }

}
