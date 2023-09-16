import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkIfNumber, isGreaterThanZero } from '../shared/validators/customValidators';
import { Exercise, ExerciseApi } from '../shared/types/customTypes';
import { RoutineService } from '../shared/services/RoutineService';
import { ExercisesApiService } from '../shared/services/exercises-api.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ErrorMessageService } from '../shared/services/error-message.service';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.scss']
})

export class AddRoutineComponent implements OnInit {
  private inputChanged$ = new Subject<string>();

  addExerciseForm!: FormGroup;
  availableExercises: string[] = [];
  workoutInputChanged = true;
  errorMessage?: string | null;
  

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

    if (!this.addExerciseForm.invalid) {
      if (!this.workoutInputChanged) {
        this.exercises.push(this.addExerciseForm.value);
        this.addExerciseForm.reset();
        this.addExerciseForm.patchValue(this.initExercise);
        this.workoutInputChanged = true;
      } else {
        this.errorMessage = 'Invalid workout selected'
      }
    }
  }

  nextStep() {

    if (this.exercises.length > 0) {
      this.routineService.setExercises(this.exercises);
      this.router.navigate(['/home/add-routine/final'])
    }
  }

  searchExercises() {
    const exerciseName = this.addExerciseForm.value.workout 

    if (this.addExerciseForm.controls['workout'].dirty) {
      this.workoutInputChanged = true;
    }
    
    if (this.workoutInputChanged) {
      this.inputChanged$.next(exerciseName);
    }
  }

  selectExercise(name: string) {
    this.addExerciseForm.controls['workout'].setValue(name);
    this.addExerciseForm.controls['workout'].markAsPristine();
    this.availableExercises = [];
    this.workoutInputChanged = false;
  }

  constructor(
    private router: Router, 
    private routineService: RoutineService, 
    private exercisesService: ExercisesApiService,
    private errorMessageService: ErrorMessageService
  ) {}

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

    this.inputChanged$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((inputValue: string) => {  
          return this.exercisesService.getExercises(inputValue);
        })
      )
      .subscribe((data: ExerciseApi[]) => {
        this.availableExercises = data.map(exercise => exercise.name).slice(0, 5);
      });

    this.addExerciseForm.valueChanges.subscribe(status => {
      if (status.unit === 'rep') { this.reps = true}
      else {this.reps = false}
      this.submittedExercise = false;
      this.errorMessage = null;
    });

    this.workout.valueChanges.subscribe(() => {
      this.setErrorMessage(this.workout, 'Workout');
    });
  
    this.weight.valueChanges.subscribe(() => {
      this.setErrorMessage(this.weight, 'Weight');
    });
  
    this.sets.valueChanges.subscribe(() => {
      this.setErrorMessage(this.sets, 'Sets');
    });
  
    this.quantity.valueChanges.subscribe(() => {
      this.setErrorMessage(this.quantity, this.reps ? 'Reps' : 'Duration');
    });
  }

  get workout() { return this.addExerciseForm.controls['workout']};
  get weight() { return this.addExerciseForm.controls['weight']};
  get sets() { return this.addExerciseForm.controls['sets']};
  get quantity() { return this.addExerciseForm.controls['quantity']};

  setErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = !this.errorMessage ? this.errorMessageService.getErrorMessage(field, fieldName) : this.errorMessage;
  }
}
