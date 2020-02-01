import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAre'
})
export class IsArePipe implements PipeTransform {

  transform(value: any, includeValue: boolean = false): any {
    if (typeof value === 'string' || typeof value === 'number') {
      if (includeValue) {
        return value.toString() === '1' ? `${value} is` : `${value} are`;
      }

      return value.toString() === '1' ? 'is' : 'are';
    }
    
    return null;
  }

}
