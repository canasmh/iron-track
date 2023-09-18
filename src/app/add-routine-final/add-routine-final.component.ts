import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../shared/services/RoutineService';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutinesService } from '../shared/services/RoutinesService';
import { ErrorMessageService } from '../shared/services/error-message.service';

@Component({
  selector: 'app-add-routine-final',
  templateUrl: './add-routine-final.component.html',
  styleUrls: ['./add-routine-final.component.scss']
})

export class AddRoutineFinalComponent implements OnInit {

  nameRoutineForm!: FormGroup;
  submitted: boolean = false;
  errorMessage?: string | null;

  addRoutine() {
    this.submitted = true;
    this.errorMessage = null;
    if (!this.nameRoutineForm.invalid) {
      const name: string = this.nameRoutineForm.value['name'];
      this.routineService.setRoutineName(name)
      this.routines.addRoutine(this.routineService.getRoutine());
      this.routineService.resetRoutine();
      this.router.navigate(['/home']);
    } else {
      if (this.name.invalid) {
        this.getErrorMessage(this.name, 'Name');
      } else {
        console.error('Uncaught Validation Error');
        this.errorMessage = 'Uncaught Validation Error';
      }
    }
  }

  constructor(
    private router: Router, 
    private routineService: RoutineService, 
    private routines: RoutinesService,
    private errorMessageService: ErrorMessageService,
    ) {}

  ngOnInit(): void {

    this.nameRoutineForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ])
    })

    this.nameRoutineForm.valueChanges.subscribe(status => {
      this.submitted = false;
    })
  }

  get name() { return this.nameRoutineForm.controls['name']}

  getErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
