import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  errorMessage: { [key: string]: (fieldName: string, length?: number) => string } = {
    required: (fieldName: string) => `${fieldName} is required`,
    notANumber: (fieldName: string) => `${fieldName} must be a number`,
    lessThanZero: (fieldName: string) => `${fieldName} must be greater than zero`,
    minlength: (fieldName:string, length?: number) => `${fieldName} needs at least ${length} characters`,
    maxlength: (fieldName:string, length?: number) => `${fieldName} needs at least ${length} characters`,
    passwordMismatch: (fieldName: string) => `Passwords do not match`,
    email: (fieldName: string) => `${fieldName} is invalid`,
    pattern: (fieldName: string) => `${fieldName} is invalid`,
  }

  getErrorMessage(field: AbstractControl, fieldName: string): string | null {
    if (field.errors) {
      const errorKey = Object.keys(field.errors)[0];
      const errorMessageFn = this.errorMessage[errorKey];

      if (errorMessageFn) {
        const length = field.errors[errorKey]?.requiredLength;
        return errorMessageFn(fieldName, length);
      }
    }

    return null;
  }
}
