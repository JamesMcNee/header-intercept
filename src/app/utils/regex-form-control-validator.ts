import { AbstractControl } from '@angular/forms';

export function ValidateRegex(control: AbstractControl): { validRegex: boolean } {
    try {
        new RegExp(control.value);
    } catch {
        return { validRegex: false };
    }
  }