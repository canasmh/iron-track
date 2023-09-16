import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  errorMessage: { [key: string]: (fieldName: string) => string } = {
    required: (fieldName: string) => `${fieldName} is required`,
    notANumber: (fieldName: string) => `${fieldName} must be a number`,
    lessThanZero: (fieldName: string) => `${fieldName} must be greater than zero`,
  }

  getErrorMessage(field: AbstractControl, fieldName: string): string | null {
    if (field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      const errorMessageFn = this.errorMessage[errorKey];

      if (errorMessageFn) {
        return errorMessageFn(fieldName);
      }
    }

    return null;
  }
}
