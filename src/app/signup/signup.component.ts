import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../shared/validators/customValidators';
import { Router } from '@angular/router';
import { User } from '../../shared/types/customTypes';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  submitted: boolean = false;
  signupForm!: FormGroup;
  errorMessage?: string | null;
  userData: User = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (!this.signupForm.invalid) {
      this.userData.name = this.signupForm.value.name.trim();
      this.userData.email = this.signupForm.value.email.trim();
      this.userData.password = this.signupForm.value.password.trim();

      // Call the signup method from the AuthService
      this.authService.signup(this.userData).subscribe({
        next: (data) => {
          // this is executed if api call is successfull
          this.authService.addHeader('Authorization', `Bearer ${data.token}`);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        },
        error: (e) => {
          // this is where I would handle errors
          this.errorMessage = e.error.message;
          console.error('Error on signup', e);
        }
      });
    } else {
      if (this.name.invalid) {
        this.getErrorMessage(this.name, 'Name');
      } else if (this.email.invalid) {
        this.getErrorMessage(this.email, 'Email');
      } else if (this.password.invalid) {
        this.getErrorMessage(this.password, 'Password');
      } else if (this.confirmPassword.invalid) {
        this.getErrorMessage(this.confirmPassword, 'Confirm Password');
      } else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }
    }
  }

  constructor(private router: Router, private authService: AuthService, private errorMessageservice: ErrorMessageService) {}

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
        Validators.maxLength(72)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(72)
      ])
    }, { validators: confirmPasswordValidator });

    this.signupForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  get name() { return this.signupForm.controls['name']; }
  get email() { return this.signupForm.controls['email']; }
  get password() { return this.signupForm.controls['password']; }
  get confirmPassword() { return this.signupForm.controls['confirmPassword']; }

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageservice.getErrorMessage(field, fieldName);
  }
}
