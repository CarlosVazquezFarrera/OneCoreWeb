import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  OnSubmit(registroForms: NgForm){
    //console.log(registroForms.controls['email'].errors);
  }

}
