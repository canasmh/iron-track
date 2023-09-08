import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../shared/services/RoutineService';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutinesService } from '../shared/services/RoutinesService';

@Component({
  selector: 'app-add-routine-final',
  templateUrl: './add-routine-final.component.html',
  styleUrls: ['./add-routine-final.component.scss']
})

export class AddRoutineFinalComponent implements OnInit {

  nameRoutineForm!: FormGroup;
  submitted: boolean = false;

  addRoutine() {
    this.submitted = true;

    if (!this.nameRoutineForm.invalid) {
      const name: string = this.nameRoutineForm.value['name'];
      this.routineService.setRoutineName(name)
      this.routines.addRoutine(this.routineService.getRoutine());
      this.routineService.resetRoutine();
      this.router.navigate(['/home']);
    }
  }

  constructor(private router: Router, private routineService: RoutineService, private routines: RoutinesService) {}

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

  getErrorMessage(name: AbstractControl) {
    console.log(name?.errors?.['required']);
    if (name?.errors?.['required']) {
      return 'A name is required';
    } else if (name?.errors?.['minlength']) {
      return 'Name must be greater than 2 characters';
    } else {
      return null;
    }
  }
}
