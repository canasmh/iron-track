import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkIfNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return { required: true}
    }

    if (isNaN(value)) {
      return { notANumber: true };
    }

    return null;
  };
}
  
export function isGreaterThanZero(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value <= 0 ) {
      return { lessThanZero: true}
    } else {
      return null;
    }
  }
}
  
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log('in function', control.get('password')?.value, control.get('confirmPassword')?.value)
  if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true }) 
  }
  return null;
};