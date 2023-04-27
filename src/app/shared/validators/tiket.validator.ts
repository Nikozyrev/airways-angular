import { AbstractControl } from '@angular/forms';

export function tiketValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const allZero = control.value.every(
    (topping: { amount: number }) => topping.amount === 0
  );
  if (allZero) {
    return { dateInvalid: true };
  } else {
    return null;
  }
}
