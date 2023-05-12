import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(start: Date | undefined, end: Date | undefined): string {
    const formattedStart = this.datePipe.transform(start, 'd MMM, y, H:mm');
    const formattedEnd = this.datePipe.transform(end, 'H:mm');
    return `${formattedStart} — ${formattedEnd}`;
  }
}
