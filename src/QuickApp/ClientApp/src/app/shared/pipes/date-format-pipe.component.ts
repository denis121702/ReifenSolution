import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Constants} from '../../constants/constant';

@Pipe({
  name: 'DateFormatPipe',
})

export class DateFormatPipe implements PipeTransform {
  transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, Constants.DATE_TIME_FMT);
    return value;
  }
}
