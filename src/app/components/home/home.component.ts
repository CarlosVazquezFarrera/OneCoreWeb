import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { SessionstorageserviceService } from 'src/app/services/sessionstorageservice.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { Response } from 'src/app/models/Api/Response';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //#region Constructor
  constructor(private usuarioService: UsuarioserviceService) { }
  //#endregion

  //#region 
  public Usuarios: Array<Usuario>;
  //#endregion

  //#region Métodos
  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((responseUsuarioApie: Response<Array<Usuario>>)=>{
      this.Usuarios = responseUsuarioApie.data;
      console.log(this.Usuarios);
    });
  }
  //#endregion

}
