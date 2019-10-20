import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'labelColor'
})
export class LabelColorPipe implements PipeTransform {

  transform( valor: string): any {
 let etiqueta: string;

 switch( valor) {
    case 'verd': {
       etiqueta = 'label-success';
       break;
    }
    case 'vermell': {
        etiqueta = 'label-danger';
        break;
     }
     case 'blau': {
        etiqueta = 'label-danger';
        break;
     }
     case 'groc': {
        etiqueta = 'label-warning';
        break;
     }
     case 'morat': {
        etiqueta = 'label-primary';
        break;
     }
    default: {
        etiqueta = '';
       break;
    } 
 }

    return etiqueta;
  }

}
