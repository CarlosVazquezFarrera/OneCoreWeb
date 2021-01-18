import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

import { MathValidator } from '../shared/CustomValidator/MatchValidator';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { SimpleResponse } from 'src/app/models/Api/SimpleResponse';


import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  //#endregion Constructor
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioserviceService,
    private router: Router) { 
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

  //Ejecuta el método del Api que realzia el regfistro
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

    //Modal de cargando
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Registrando'
    });
    Swal.showLoading();
    this.usuarioService.altaUsuario(this.usuario).subscribe((apiAltaResponse: SimpleResponse)=>{
      if (apiAltaResponse.exito){
        Swal.fire({
          icon:'success',
          allowOutsideClick: false,
          text: apiAltaResponse.mensaje
        });
        this.router.navigateByUrl('login');
      }
      else{
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: apiAltaResponse.mensaje
        });
      }
    },()=>{ //Error inesperado
      Swal.fire({
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
    });
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
