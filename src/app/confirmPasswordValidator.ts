import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';
  
  export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    console.log('in function', control.get('password')?.value, control.get('confirmPassword')?.value)
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true }) 
    }
    return null;
  };