import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatter'
})
export class TimeFormatterPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null || isNaN(value) || value < 0) {
      return '00:00:000';
    }
    const milliseconds = Math.floor(value);
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;

    return `${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s:${ms.toString().padStart(3, '0')}ms`;
  }
}
