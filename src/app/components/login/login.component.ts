import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';

import { LoginserviceService } from 'src/app/services/loginservice.service'; 

import Swal from 'sweetalert2';
import { apiResponse } from 'src/app/models/apiResponse';
import { strict } from 'assert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginserviceService,
              private router: Router) { }

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean;

  ngOnInit(): void {
    if(localStorage.getItem('User')){
      this.usuario.User = localStorage.getItem('User');
    }

    /*this.usuario.User = 'prueba@gmail.com';
    this.usuario.Password = '12345';*/
  }

  OnSubmit(form: NgForm){
    if(form.valid){

      Swal.fire({
        icon:'info',
        allowOutsideClick: false,
        text: 'Iniciando sesión'
      });
      Swal.showLoading();

      this.service.login(this.usuario).subscribe((response: apiResponse<UsuarioModel>)=>{
        if(response.exito)
        {
          Swal.close();

          if(this.recordarme){
            localStorage.setItem('User', this.usuario.User);
          }
          localStorage.setItem('Token', 'TokenGenerado');

          this.router.navigateByUrl('home');
        }
        else
        {
          Swal.fire({
            icon:'error',
            allowOutsideClick: false,
            text: response.mensaje
          });
        }
      }, (err)=>{
        Swal.fire({
          icon:'error',
          allowOutsideClick: false,
          text: 'Hubo un error al conectar al servidor'
        });
      }
      );
    }
  }
}
