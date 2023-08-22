import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../confirmPasswordValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  signupForm!: FormGroup;

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/@.*\./)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(72),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(72),
      ])
    }, {validators: confirmPasswordValidator});  

    this.signupForm.valueChanges.subscribe(newStatus => {
      this.submitted = false;
    })
  }

  get name() { return this.signupForm.controls['name'] ; }
  get email() { return this.signupForm.controls['email'] ; }
  get password() { return this.signupForm.controls['password'] ; }
  get confirmPassword() { return this.signupForm.controls['confirmPassword'] ; }

  getErrorMessage(name: AbstractControl, email: AbstractControl, password: AbstractControl, confirmPassword: AbstractControl) {
    if (name?.errors?.['required']) {
      return 'Name is required';
    } else if (name?.errors?.['minlength']) {
      return 'Name needs at leat 3 characters';
    } else if (name?.errors?.['maxlength']) {
      return 'Name exceeds 18 characters'
    } else if (email?.errors?.['required']) {
      return 'Email is required';
    } else if (email?.errors?.['email'] || email?.errors?.['pattern']) {
      return 'Email is invalid';
    }  else if (password?.errors?.['required']) {
      return 'Password is required';
    } else if (password?.errors?.['minlength']) {
      return 'Password needs at least 5 characters';
    } else if (password?.errors?.['maxlength']) {
      return 'Password exceeds 72 characters';
    } else if (confirmPassword?.errors?.['required']) {
      return 'Please confirm password';
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      return 'Password do not match';
    } else {
      console.log(confirmPassword?.errors)
      return '';
    }
  }
}
