import { ValidatorFn, AbstractControl } from '@angular/forms';

export function notOnlySpacesValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value.trim();
    const isValid = value.split(" ").length <= 3;
    return isValid ? null : { notOnlySpaces: true };
  };
}


