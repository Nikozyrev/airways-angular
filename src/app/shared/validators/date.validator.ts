import { AbstractControl } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const inputDate = new Date(control.value);
  if (inputDate.getTime() > currentDate.getTime() - 86400000) {
    return null;
  } else {
    return { dateInvalid: true };
  }
}
