import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit(): void {
    this.usuario.User = 'prueba@gmail.com';
  }

  OnSubmit(registroForms: NgForm){
    //console.log(registroForms.controls['email'].errors);
  }

}
