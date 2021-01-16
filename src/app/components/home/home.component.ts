import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EditarusuarioComponent } from '../dialogs/editarusuario/editarusuario.component';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { Response } from 'src/app/models/Api/Response';
import { Usuario } from 'src/app/models/usuario';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //#region Constructor
  constructor(
    private usuarioService: UsuarioserviceService, 
    private dialog: MatDialog){

  }
  //#endregion

  //#region Atributos
  public Usuarios: Array<Usuario>;
  public recargar: boolean = false;
  //#endregion

  //#region Métodos

  //Una vez que se renderiza la pantalla, se consulta al api y se obtiene la información
  ngOnInit(): void {
    this.cargarDatos();
  }
  public editarUsuario(usuario: Usuario): void{
    const dialogRef = this.dialog.open(EditarusuarioComponent, { 
      data: usuario, 
      disableClose: true});

    dialogRef.afterClosed().subscribe(()=>{
      this.cargarDatos();
    });
  }

  public desactivarUsuario(usuario: Usuario): void{
    console.log(usuario);
    Swal.fire({
      title: `¿Seguro que desea desactivar al usuario ${usuario.nombreUsuario}?`,
      showCancelButton: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  cargarDatos(): void{
    this.recargar = false;
    //Modal de cargando
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Cargando datos'
    });
    Swal.showLoading();
    this.usuarioService.obtenerUsuarios().subscribe((responseUsuarioApie: Response<Array<Usuario>>)=>{
      if (responseUsuarioApie.exito){ //Respuesta exitosa del api
        this.Usuarios = responseUsuarioApie.data;
        Swal.close();
      }
      else{ //Respuesta negativa del api
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: responseUsuarioApie.mensaje
        });
      }
    }, ()=>{
      Swal.fire({ //Error inesperado
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
      this.recargar = true;
    });
  }
  //#endregion
}
