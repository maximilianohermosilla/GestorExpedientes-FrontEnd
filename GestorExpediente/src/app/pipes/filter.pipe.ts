import { Pipe, PipeTransform } from '@angular/core';
import { Expediente } from '../models/expediente';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  itemFiltered: Expediente[] = [];
  transform(expedientes: Expediente[], filterText: string): any {
    if (!expedientes || filterText == "") {
        return expedientes;
    }
    else{  
      this.itemFiltered = expedientes;
      this.itemFiltered = this.itemFiltered.filter((element) => element.nombre.toLowerCase().includes(filterText.toLowerCase()) );
      return this.itemFiltered;
    }
}
}