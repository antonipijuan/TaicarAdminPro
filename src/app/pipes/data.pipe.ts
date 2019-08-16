import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform( vdate: string): any {
    return moment(vdate).format('DD-MM-YYYY');
  }

}
