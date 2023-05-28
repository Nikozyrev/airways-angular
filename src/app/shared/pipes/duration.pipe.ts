import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(milliSeconds: number): string {
    const days = Math.floor(milliSeconds / (24 * 60 * 60 * 1000));
    const daysFromMilliSeconds = milliSeconds % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysFromMilliSeconds / (60 * 60 * 1000));
    const hoursFromMilliSeconds = milliSeconds % (60 * 60 * 1000);
    const minutes = Math.floor(hoursFromMilliSeconds / (60 * 1000));
    let result = '';
    if (days) result += `${days}d `;
    if (hours) result += `${hours}h `;
    if (minutes) result += `${minutes}m `;
    return result.trim();
  }
}
