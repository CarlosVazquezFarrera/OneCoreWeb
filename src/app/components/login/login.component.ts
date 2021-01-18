import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';
import { LoginserviceService } from 'src/app/services/loginservice.service'; 
import { Usuario } from 'src/app/models/usuario';
import { Response } from 'src/app/models/Api/Response';

import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  //#region  Constructor
  constructor(
    private serviceLogin: LoginserviceService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private sesionStorageService: SessionstorageserviceService)
    {
      this.buildForm();
    }
  //#endregion

  //#region Atributos
  usuario: Usuario;
  form: FormGroup;
  //#endregion

  //#region  Métodos
  ngOnInit(): void {

  }
  ///Construye el fornmulario reactivo 
  private buildForm(): void{
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  };
  
  //Consula al api para realziar el proceso de logueo
  login(event: Event): void{
    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };

    this.usuario = new Usuario ();
    this.usuario.correo = this.emailField.value;
    this.usuario.password = CryptoJS.SHA3(this.passwordFiel.value).toString();

    //Modal de cargando
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Iniciando sesión'
    });
    Swal.showLoading();
    this.serviceLogin.login(this.usuario).subscribe((responseApiLogin: Response<Usuario>)=>{
      //Respuesta exitosa de la api
      if (responseApiLogin.exito){
        Swal.close();
        this.sesionStorageService.SetLogin();
        this.sesionStorageService
        this.sesionStorageService.SetUsuario(responseApiLogin.data);
        this.router.navigateByUrl('home');
      }
      //Respuesta no exitosa de la api
      else{
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: responseApiLogin.mensaje
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

  //#region  Gets
  get emailField(){
    return this.form.get('email');
  }

  get passwordFiel(){
    return this.form.get('password');
  }
  //#endregion
}
