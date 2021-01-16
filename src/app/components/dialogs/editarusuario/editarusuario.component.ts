import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  //#region Constructor
  constructor(public dialogRef: MatDialogRef<EditarusuarioComponent>, 
    private formBuilder: FormBuilder) {

  }
  //#endregion

  form: FormGroup;


  //#region  Métodos

  private buildForm(): void{
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  };
  
  ngOnInit(): void {
  }

  cerrarDialogo(){
    this.dialogRef.close();
  }

  login(event: Event): void{
    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };
  }
  //#endregion
}
