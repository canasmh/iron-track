import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayService } from '../../shared/services/overlay.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/types/User';
import { UserService } from '../../shared/services/user.service';
import { ErrorMessageService } from '../../shared/services/error-message.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  @Input() isOpen: boolean = true;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  submitted: boolean = false;
  editPasswordForm!: FormGroup;
  errorMessage?: string | null;
  userObject: User = {
    email: '', password: '',
    name: ''
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
    });

    this.editPasswordForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;
    console.log(this.editPasswordForm.value);
    console.log('invalid', this.editPasswordForm.invalid);

    if (!this.editPasswordForm.invalid ) {
      this.userObject.password = this.editPasswordForm.value.password.trim();
      // this.userService.editPassword({ password: this.userObject.password }, this.oldPassword).subscribe({
      //   next:(data) => {
      //     console.log(data);
      //   }
      // });
    } else {
      if (this.password.invalid) {
        this.getErrorMessage(this.password, 'Password');
      } else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }
    }
  }

  get currentPassword() {
    return this.editPasswordForm.controls['currentPassword'].value;
  }
  get password() {
    return this.editPasswordForm.controls['password'].value;
  }
  get confirmPassword() {
    return this.editPasswordForm.controls['confirmPassword'].value;
  }
  closeOverlay() {
    this.closeModal.emit();
  }

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
