import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';

import { LoginserviceService } from 'src/app/services/loginservice.service'; 
import { Usuario } from 'src/app/models/usuario';
import { Response } from 'src/app/models/Api/Response';
import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';

import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  ngOnInit(): void {

  }

  //#region  Métodos

  ///Construye el fornmulario reactivo 
  private buildForm(): void{
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  };
  
  //Hace el proceso de Logueo
  login(event: Event): void{
    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };

    this.usuario = new Usuario ();
    this.usuario.correo = this.emailField.value;
    this.usuario.password = CryptoJS.SHA3(this.passwordFiel.value).toString();

    console.log(this.usuario.password);
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
    },(error)=>{ //Error inesperado
      Swal.fire({
        icon:'error',
        allowOutsideClick: false,
        text: 'Hubo un error al conectar al servidor'
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
