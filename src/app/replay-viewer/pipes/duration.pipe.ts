import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  private decimalPipe: DecimalPipe;

  public constructor(locale: string) {
    this.decimalPipe = new DecimalPipe(locale);
  }

  public transform(value: number, minuteDigits: number = 0, secondFormat: string = '2.0-0', defaultIfZero?: string): string {
    if (value === 0 && defaultIfZero) {
      return defaultIfZero;
    }

    const minutes = Math.floor(value / 60);
    const seconds = value - (minutes * 60);

    const minStr = this.decimalPipe.transform(minutes, minuteDigits + '.0-0');

    let str = '';
    if (minutes || minuteDigits !== 0) {
      str = minStr + 'm';
    }
    if (seconds || !secondFormat.startsWith('0.')) {
      if (str !== '') {
        str += ' ';
      }
      str += this.decimalPipe.transform(seconds, secondFormat) + 's';
    }
    return str || '0s';
  }

}
