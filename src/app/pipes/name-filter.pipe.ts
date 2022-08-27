import {Pipe, PipeTransform} from '@angular/core';
import {filter} from 'lodash';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any[], nameFilterValue: string) {
    return nameFilterValue ? filter(items, (itm: any) => itm?.name?.toLowerCase().includes(nameFilterValue)) : items;
  }

}
