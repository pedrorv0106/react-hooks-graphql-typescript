import moment from 'moment';

export function FormatDate(value: string | Date, format: string) {
  return moment(value).format(format);
}
