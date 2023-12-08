import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/types/User";
import {ErrorMessageService} from "../../shared/services/error-message.service";
import {UserService} from "../../shared/services/user.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss']
})
export class EditNameComponent implements OnInit {
  submitted: boolean = false;
  editNameForm!: FormGroup;
  errorMessage?: string | null;
  userObject: User = {
    email: "", password: "",
    name: "",
  };

  constructor(private errorMessageService: ErrorMessageService, private userService: UserService, private router: Router) {
  }

  @Input() isOpen: boolean = true;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit(): void {
    this.editNameForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        confirmName: new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ])
      }
    )
    this.editNameForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null
    console.log(this.editNameForm.value)
    console.log("invalid", this.editNameForm.invalid);

    if (!this.editNameForm.invalid ) {
      this.userObject.name = this.editNameForm.value.name.trim();
      this.userService.editName({name: this.userObject.name}).subscribe({
        next:(data) => {

        }
      })
    } else {
      if (this.name.invalid) {
        this.getErrorMessage(this.name, 'newName');
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
  get name(){
    return this.editNameForm.controls['name'];
  }
  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }

}
