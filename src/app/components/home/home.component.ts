import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EditarusuarioComponent } from '../dialogs/editarusuario/editarusuario.component';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { Response } from 'src/app/models/Api/Response';
import { Usuario } from 'src/app/models/usuario';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { SimpleResponse } from 'src/app/models/Api/SimpleResponse';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //#region Constructor
  constructor(
    private usuarioService: UsuarioserviceService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar){

  }
  //#endregion

  //#region Atributos
  public Usuarios: Array<Usuario>;
  public recargar: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
      confirmButtonColor: '#d14529'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuarioService.desactivarUsuario(usuario.id).subscribe((apiDesactivarUsuarioResponse: SimpleResponse)=>{
          if(apiDesactivarUsuarioResponse.exito){
            this.cargarDatos();
            this.snackBar.open('Se desactivó al usuario',  'Aceptar', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else{
            Swal.fire({
              icon:'info',
              allowOutsideClick: false,
              text: apiDesactivarUsuarioResponse.mensaje
            }); 
          }
        });
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
