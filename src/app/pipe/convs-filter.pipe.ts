import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convsFilter'
})
export class ConvsFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
