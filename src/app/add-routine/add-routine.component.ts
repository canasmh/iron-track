import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkIfNumber, isGreaterThanZero } from '../shared/validators/customValidators';
import { Exercise } from '../shared/types/customTypes';
import { RoutineService } from '../shared/services/RoutineService';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.scss']
})

export class AddRoutineComponent implements OnInit {

  addExerciseForm!: FormGroup;
  

  initExercise: Exercise = {
    workout: "",
    weight: "",
    weightUnit: "lbs",
    sets: "",
    quantity: "",
    unit: "rep"
  }

  exercises: Exercise[] = []
  nExercises = this.exercises.length;
  reps: boolean = true;
  submittedExercise = false;

  addExercise() {
    this.submittedExercise = true

    if (!this.addExerciseForm.invalid ) {
      this.exercises.push(this.addExerciseForm.value);
      this.addExerciseForm.reset();
      this.addExerciseForm.patchValue(this.initExercise);
      
    }
    
    
    console.log(this.exercises);
  }

  nextStep() {

    if (this.exercises.length > 0) {
      this.routineService.setExercises(this.exercises);
      this.router.navigate(['/home/add-routine/final'])
    }
  }

  constructor(private router: Router, private routineService: RoutineService) {}

  ngOnInit(): void {

    this.addExerciseForm = new FormGroup({
      workout: new FormControl('', [
        Validators.required,
      ]),
      weight: new FormControl('', [
        Validators.required,
        checkIfNumber()
      ]),
      sets: new FormControl('', [
        Validators.required,
        checkIfNumber(),
        isGreaterThanZero()
      ]),
      quantity: new FormControl('', [
        Validators.required,
        checkIfNumber(),
        isGreaterThanZero()
      ]),
      unit: new FormControl('rep', [
        Validators.required
      ])
    })

    this.addExerciseForm.valueChanges.subscribe(status => {
      if (status.unit === 'rep') { this.reps = true}
      else {this.reps = false}
      this.submittedExercise = false;
    });
  }

  get workout() { return this.addExerciseForm.controls['workout']};
  get weight() { return this.addExerciseForm.controls['weight']};
  get sets() { return this.addExerciseForm.controls['sets']};
  get quantity() { return this.addExerciseForm.controls['quantity']};

  getErrorMessage(workout: AbstractControl, weight: AbstractControl, sets: AbstractControl, quantity: AbstractControl) {
    if (workout?.errors?.['required']) {
      return 'A workout is required';
    } else if (weight?.errors?.['required']) {
      return 'A weight is required';
    } else if (weight?.errors?.['notANumber']) {
      return 'Weight must be a number';
    }  else if (sets?.errors?.['required']) {
      return 'Sets is required';
    } else if (sets?.errors?.['lessThanZero']) {
      return 'Sets must be greater than zero';
    } else if (sets?.errors?.['notANumber']) {
      return 'Sets must be a number';
    }  else if (quantity?.errors?.['required']) {
      return `${this.reps ? 'Reps' : 'Duration'} is required`;
    } else if (quantity?.errors?.['lessThanZero']) {
      return `${this.reps ? 'Reps' : 'Duration'} must be greater than zero`;
    } else if (quantity?.errors?.['notANumber']) {
      return `${this.reps ? 'Reps' : 'Duration'} must be a number`;
    } else {
      return null;
    }
  }
}
