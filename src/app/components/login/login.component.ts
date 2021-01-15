import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


import { LoginserviceService } from 'src/app/services/loginservice.service'; 


import { apiResponse } from 'src/app/models/Api/Response';
import { Usuario } from 'src/app/models/usuario';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region  Constructor
  constructor(private service: LoginserviceService, private router: Router, private formBuilder: FormBuilder){
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
  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
    // this.form.valueChanges.subscribe(value => {
    //   console.log(value);
    // });

  };

 save(event: Event) {
   console.log(this.form)
   event.preventDefault();
   console.log(this.form.value);
   
   if (this.form.invalid){
    this.form.markAllAsTouched();
    return;
  };
}


  
  //#endregion
  // OnSubmit(){
  //   
  // }
  
}
