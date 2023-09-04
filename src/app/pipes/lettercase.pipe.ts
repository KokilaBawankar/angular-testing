import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lettercase'
})
export class LettercasePipe implements PipeTransform {

  transform(value: string, caseType: string): string {
    switch(caseType) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
        case 'kebabcase':
          value = value.toLowerCase();
          return value.split(' ').join('-');
      default:
        return value;  

    }
  }

}
