import { FormControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    // check if the string only have whitespace
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    }
    return null;
  }
}
