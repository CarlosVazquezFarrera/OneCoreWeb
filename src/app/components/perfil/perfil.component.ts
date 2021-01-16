import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario';
import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';

import * as CryptoJS from 'crypto-js';
import { MathValidator } from '../shared/CustomValidator/MatchValidator';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private sessionService: SessionstorageserviceService) {
      this.ObtenerUsuarioYConstruirFormulario(); 
    }

  form: FormGroup;
  usuario: Usuario;
  pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{10,}$/;

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
    //this.ObtenerUsuario();
  }


  actualizar(event: Event): void{
    event.preventDefault();
    console.log(this.form);
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };
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

}
