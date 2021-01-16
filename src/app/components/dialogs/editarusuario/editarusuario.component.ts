import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  //#region Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    public dialogRef: MatDialogRef<EditarusuarioComponent>, 
    private formBuilder: FormBuilder
    ){
      this.buildForm();
  }
  //#endregion

  form: FormGroup;


  //#region  Métodos

  private buildForm(): void{
    this.form = this.formBuilder.group({
      usuario: [this.usuario.nombreUsuario, [Validators.required]],
      password: [this.usuario.password, [Validators.required]],
      passwordConfirmacion: ['', [Validators.required]],
      sexo: [this.usuario.sexo, [Validators.required]],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
    });
  };
  
  ngOnInit(): void {
  }

  cerrarDialogo(){
    this.dialogRef.close();
  }

  actualizar(event: Event): void{
    event.preventDefault();
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
  //#endregion
}
