import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from '../shared/types/customTypes';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm!: FormGroup;
  userCredentials: UserCredentials = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.invalid ) {
      this.userCredentials.email = this.loginForm.value.email
      this.userCredentials.password = this.loginForm.value.password
      this.authService.login(this.userCredentials).subscribe({
        next: (data) => {
          // this is executed if api call is successfull
          console.log(data)
          this.router.navigate(['/home'])
        },
        error: (e) => {
          // this is where I would handle errors
          console.error(e)},

      })
    }
  }

  constructor(private router: Router, private authService: AuthService) {}

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
