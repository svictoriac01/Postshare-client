import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arr: Usuario[], texto: string = ''): Usuario[] {
    if (texto === '') {
      return [];
    }

    if (!arr) {
      return arr;
    }

    texto = texto.toLowerCase();

    return arr.filter(user => user.name.toLowerCase().startsWith(texto) || user.username.toLowerCase().startsWith(texto));

  }

}
