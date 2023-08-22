import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm!: FormGroup;

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/@.*\./)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(72)
      ]),
    });  

    this.loginForm.valueChanges.subscribe(newStatus => {
      this.submitted = false;
    })
  }

  get email() { return this.loginForm.controls['email'] ; }
  get password() { return this.loginForm.controls['password'] ; }

  getErrorMessage(email: AbstractControl, password: AbstractControl) {
    if (email?.errors?.['required']) {
      return 'Email is required';
    } else if (email?.errors?.['email'] || email?.errors?.['pattern']) {
      return 'Email is invalid';
    }  else if (password?.errors?.['required']) {
      return 'Password is required';
    } else if (password?.errors?.['minlength']) {
      return 'Password needs at least 5 characters';
    } else if (password?.errors?.['maxlength']) {
      return 'Password exceeds 72 characters';
    } else {
      return '';
    }
  }
}
