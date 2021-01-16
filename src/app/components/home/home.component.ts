import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EditarusuarioComponent } from '../dialogs/editarusuario/editarusuario.component';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { Response } from 'src/app/models/Api/Response';
import { Usuario } from 'src/app/models/usuario';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { isUndefined } from 'util';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //#region Constructor
  constructor(private usuarioService: UsuarioserviceService, private dialog: MatDialog) { }
  //#endregion

  //#region 
  public Usuarios: Array<Usuario>;

  public recargar: boolean = false;
  //#endregion

  //#region Métodos
  ngOnInit(): void {
    this.cargarDatos();
  }
  public editarUsuario(usuario: Usuario): void{
    const dialogRef = this.dialog.open(EditarusuarioComponent, {disableClose: true });
  }

  public desactivarUsuario(idUsuario: string): void{
    console.log(idUsuario);
  }
   cargarDatos(): void{
    this.recargar = false;
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Cargando datos'
    });
    Swal.showLoading();
    this.usuarioService.obtenerUsuarios().subscribe((responseUsuarioApie: Response<Array<Usuario>>)=>{
      if (responseUsuarioApie.exito){
        this.Usuarios = responseUsuarioApie.data;
        Swal.close();
      }
      else{
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: responseUsuarioApie.mensaje
        });
      }
    }, (errorApi)=>{
      
      Swal.fire({
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
      this.recargar = true;
    });
  }
  //#endregion
}
