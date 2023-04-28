import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  const isValid = Date.parse(value) < Date.now();

  if (!isValid) {
    return {
      futureDate: {
        message: 'Entered date is in the future',
        valid: false,
      },
    };
  }

  return null;
}
