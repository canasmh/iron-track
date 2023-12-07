import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayService } from '../../shared/services/overlay.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { confirmPasswordValidator } from 'src/shared/validators/customValidators';
import { EditPassword } from 'src/shared/types/EditPassword';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  @Input() isOpen: boolean = true;
  @Output() closeModal = new EventEmitter<void>();

  submitted: boolean = false;
  editPasswordForm!: FormGroup;
  errorMessage?: string | null;
  editPasswordObject: EditPassword = {
    currentPassword: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private overlayServicePass: OverlayService, private userService: UserService, private errorMessageService:ErrorMessageService) {
  }

  ngOnInit(): void {
    this.editPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(72)
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

    this.editPasswordForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.errorMessage = null;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;
    console.log(this.editPasswordForm.value);
    console.log('invalid', this.editPasswordForm.invalid);

    if (!this.editPasswordForm.invalid ) {
      this.editPasswordObject = {
        currentPassword: this.currentPassword.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value
      };

      this.userService.editPassword(this.editPasswordObject).subscribe({
        next: (data) => {
          console.log('edit password res', data);
        },
        error: (err) => {
          console.log('error', err);
        }
      });
    } else {
      if (this.currentPassword.invalid) {
        this.getErrorMessage(this.currentPassword, 'Current Password');
      } else if (this.password.invalid) {
        this.getErrorMessage(this.password, 'Password');
      } else if (this.confirmPassword.invalid) {
        this.getErrorMessage(this.confirmPassword, 'Confirm Password');
      }

      else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }

      console.log('error message: ', this.errorMessage);
    }
  }

  get currentPassword() {
    return this.editPasswordForm.controls['currentPassword'];
  }
  get password() {
    return this.editPasswordForm.controls['password'];
  }
  get confirmPassword() {
    return this.editPasswordForm.controls['confirmPassword'];
  }
  closeOverlay() {
    this.closeModal.emit();
  }

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
