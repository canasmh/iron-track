import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from '../../shared/types/customTypes';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm!: FormGroup;
  errorMessage?: string | null;
  userCredentials: UserCredentials = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (!this.loginForm.invalid ) {
      this.userCredentials.email = this.loginForm.value.email.trim();
      this.userCredentials.password = this.loginForm.value.password.trim();
      this.authService.login(this.userCredentials).subscribe({
        next: (data) => {
          // this is executed if api call is successfull
          console.log(data);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          // this is where I would handle errors
          console.error(e);
        }
      });
    } else {
      if (this.email.invalid) {
        this.getErrorMessage(this.email, 'Email');
      } else if (this.password.invalid) {
        this.getErrorMessage(this.password, 'Password');
      } else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }
    }
  }

  constructor(private router: Router, private authService: AuthService, private errorMessageService: ErrorMessageService) {}

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
      ])
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  get email() { return this.loginForm.controls['email'] ; }
  get password() { return this.loginForm.controls['password'] ; }

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
