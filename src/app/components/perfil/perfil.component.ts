import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario';
import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';

import { MathValidator } from '../shared/CustomValidator/MatchValidator';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { SimpleResponse } from 'src/app/models/Api/SimpleResponse';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  //#region  Constructor  
  constructor(private formBuilder: FormBuilder, 
    private sessionService: SessionstorageserviceService,
    private servicioUsuario: UsuarioserviceService,
    private router: Router) {
      this.ObtenerUsuarioYConstruirFormulario(); 
      this.pattern = environment.pattern;
    }
  //#endregion
  
  //#region  Atributos
  form: FormGroup;
  usuario: Usuario;
  pattern: RegExp;
  //#endregion

  //#region Métodos

  //Recupera el usuario almacenado y setea los datos al formulario reactivo 
  private ObtenerUsuarioYConstruirFormulario(){
    this.usuario = this.sessionService.GetUsuario();

    this.form = this.formBuilder.group(
      {
        usuario: [this.usuario.nombreUsuario, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.pattern)]],
        passwordConfirmacion: ['', [Validators.required]],
        sexo: [this.usuario.sexo, [Validators.required]],
        correo: [this.usuario.correo, [Validators.required, Validators.email] ]
      }, 
      {
        validator: MathValidator("password", "passwordConfirmacion")
      }
    );
  }
  ngOnInit(): void {
  }
  //Realiza la petición para actualziar el usuario 
  actualizar(event: Event): void{
    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };

    this.usuario.nombreUsuario = this.usuarioField.value;
    this.usuario.password = CryptoJS.SHA3(this.passwordField.value).toString();
    this.usuario.sexo = this.sexoField.value;
    this.usuario.correo = this.correoField.value;

      //Modal de cargando
      Swal.fire({
        icon:'info',
        allowOutsideClick: false,
        text: 'Actualizando'
      });
      Swal.showLoading();
    this.servicioUsuario.actualizarUsuario(this.usuario).subscribe((actualizarUsuarioApi: SimpleResponse)=>{
      if (actualizarUsuarioApi.exito){
        Swal.fire({
          icon:'success',
          allowOutsideClick: false,
          text: actualizarUsuarioApi.mensaje
        });
        this.sessionService.LogOut();
        this.router.navigateByUrl('login');
      }
      else{
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: actualizarUsuarioApi.mensaje
        });
      }
    }, ()=>{
      Swal.fire({
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
    });
  }
  //#endregion

  //#region  Gets
  get usuarioField(){
    return this.form.get('usuario');
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
  get correoField(){
    return this.form.get('correo');
  }
  //#endregion
}
