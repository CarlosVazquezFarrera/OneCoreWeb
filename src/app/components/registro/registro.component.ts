import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment.prod';

import { MathValidator } from '../shared/CustomValidator/MatchValidator';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //#endregion Constructor
  constructor(private formBuilder: FormBuilder) { 
    this.regex = environment.pattern;
    this.generarFormulario();
  }
  //#endregion

  //#endregion Atributos
  regex: RegExp;
  form: FormGroup;
  usuario: Usuario;
  //#endregion

  //#region  Métodos
  ngOnInit(): void {
  }
  //Genera el formulario reactivo
  generarFormulario():void{
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(7)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.regex)]],
      passwordConfirmacion: ['', [Validators.required]],
      sexo: ['F', [Validators.required]],
      estatus: [true, [Validators.required]],
    },{
      validators: MathValidator('password','passwordConfirmacion')
    });
  }


  registro(event: Event): void{
    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };
    this.usuario = new Usuario;
    this.usuario.correo = this.emailField.value;
    this.usuario.nombreUsuario = this.nombreUsuarioField.value;
    this.usuario.password =  CryptoJS.SHA3(this.passwordField.value).toString();
    this.usuario.sexo = this.sexoField.value;
    this.usuario.estatus = this.estatusField.value;

    console.log(this.usuario);
  }
  //#endregion

  //#region Gets
  get emailField(){
    return this.form.get('email');
  }
  get nombreUsuarioField(){
    return this.form.get('nombreUsuario');
  }
  get passwordField(){
    return this.form.get('password');
  }
  get passwordConfirmacionField(){
    return this.form.get('passwordConfirmacion');
  }
  get sexoField(){
    return this.form.get('sexo');
  }
  get estatusField(){
    return this.form.get('estatus');
  }
  //#endregion
}
