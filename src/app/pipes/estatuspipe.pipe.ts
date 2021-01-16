import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatuspipe'
})
export class EstatuspipePipe implements PipeTransform {

  transform(estatus: boolean): string {
    return estatus?"Activo":"Inactivo";
  }

}
