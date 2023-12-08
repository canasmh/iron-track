import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OverlayService} from "../../shared/services/overlay.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../shared/services/error-message.service";
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/types/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user-name',
  templateUrl: './edit-user-name.component.html',
  styleUrls: ['./edit-user-name.component.scss']
})
export class EditUserNameComponent implements OnInit{
  submitted: boolean = false;
  editEmailForm!: FormGroup;
  errorMessage?: string | null;
  userObject: User ={
    email: "", password: "",
    name: "",
  };
  constructor(private overlayService: OverlayService, private errorMessageService: ErrorMessageService,
              private userService: UserService, private authService: AuthService, private router: Router) {
  }
  @Input() isOpen: boolean = true;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit(): void {
    this.editEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/@.*\./)
      ])
    })

    this.editEmailForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }


  onSubmit() {
    this.submitted = true;
    this.errorMessage = null
    console.log(this.editEmailForm.value)
    console.log("invalid", this.editEmailForm.invalid);

    if (!this.editEmailForm.invalid ) {
      this.userObject.email = this.editEmailForm.value.email.trim();
      this.userService.editEmail({email: this.userObject.email}).subscribe({
        next:(data) => {
          this.router.navigate(['/profile']);
        }
      })
    } else {
      if (this.email.invalid) {
        this.getErrorMessage(this.email, 'Email');
      } else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }
    }
    location.reload();
  }


  closeOverlay() {
    this.closeModal.emit();
  }

  get email(){
    return this.editEmailForm.controls['email'];
  }

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
