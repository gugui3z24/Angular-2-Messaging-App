import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const compare = (a, b) => {
        if (a.message_date_received) {
          if (a.message_date_received > b.message_date_received) {
            return -1;
          } else if (a.message_date_received < b.message_date_received) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a.sent_message_date_sent > b.sent_message_date_sent) {
            return -1;
          } else if (a.sent_message_date_sent < b.sent_message_date_sent) {
            return 1;
          } else {
            return 0;
          }
        }
      };
      value = value.sort(compare);
    }
    return value;
  }

}
