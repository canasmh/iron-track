import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkIfNumber, isGreaterThanZero } from '../../shared/validators/customValidators';
import { RoutineExercise } from 'src/shared/types/RoutineExercise';
import { Exercise, initExercise } from 'src/shared/types/Exercise';
import { RoutineService } from '../../shared/services/routine.service';
import { ExercisesApiService } from '../../shared/services/apiNinjas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ErrorMessageService } from '../../shared/services/error-message.service';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.scss']
})

export class AddRoutineComponent implements OnInit {
  private inputChanged$ = new Subject<string>();

  addExerciseForm!: FormGroup;
  availableExercises: Exercise[] = [];
  workoutInputChanged = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  weightUnit: string = 'lbs';

  routineExercises: RoutineExercise[] = [];
  exercise: Exercise = initExercise;
  nExercises = this.routineExercises.length;
  reps: boolean = true;
  submittedExercise = false;

  addExercise() {
    this.submittedExercise = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.workoutInputChanged) {
      this.errorMessage = 'Invalid workout selected';
    } else if (!this.addExerciseForm.invalid) {
      // add exercises to the local routineExercises
      this.routineExercises.push({
        exercise: this.exercise,
        weight: this.weight.value + ` ${this.weightUnit}`,
        sets: this.sets.value,
        quantity: this.quantity.value,
        quantityUnit: this.quantityUnit.value
      });

      // reset form values
      this.addExerciseForm.patchValue({
        name: '',
        weight: '',
        sets: '',
        quantity: '',
        quantityUnity: 'rep'
      });

      this.successMessage = 'Exercise successfully added';

      this.workoutInputChanged = true;

    } else {
      if (this.weight.invalid) {
        this.setErrorMessage(this.weight, 'Weight');
      } else if (this.sets.invalid) {
        this.setErrorMessage(this.sets, 'Sets');
      } else if (this.quantity.invalid) {
        this.setErrorMessage(this.quantity, this.reps ? 'Reps' : 'Duration');
      }
    }
  }

  nextStep() {
    if (this.routineExercises.length > 0) {
      this.routineService.setExercises(this.routineExercises);
      this.router.navigate(['/routines/add-routine/final']);
    }
  }

  searchExercises() {
    const exerciseName = this.addExerciseForm.value.name;

    if (this.addExerciseForm.controls['name'].dirty) {
      this.workoutInputChanged = true;
    }

    if (this.workoutInputChanged) {
      this.inputChanged$.next(exerciseName);
    }
  }

  selectExercise(exercise: Exercise) {
    this.addExerciseForm.controls['name'].setValue(exercise.name);
    this.addExerciseForm.controls['name'].markAsPristine();
    this.availableExercises = [];
    this.workoutInputChanged = false;
    this.exercise = exercise;
  }

  constructor(
    private router: Router,
    private routineService: RoutineService,
    private exercisesService: ExercisesApiService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {

    this.addExerciseForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
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
      quantityUnit: new FormControl('rep', [
        Validators.required
      ])
    });

    this.inputChanged$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((inputValue: string) => {
          return this.exercisesService.getExercises(inputValue);
        })
      )
      .subscribe((data: Exercise[]) => {
        this.availableExercises = data.map(exercise => exercise);
      });

    this.addExerciseForm.valueChanges.subscribe(status => {
      this.reps = status.quantityUnit === 'rep';
      this.submittedExercise = false;
      this.successMessage = null;
    });
  }

  get name() { return this.addExerciseForm.controls['name']; }
  get weight() { return this.addExerciseForm.controls['weight']; }
  get sets() { return this.addExerciseForm.controls['sets']; }
  get quantity() { return this.addExerciseForm.controls['quantity']; }
  get quantityUnit() { return this.addExerciseForm.controls['quantityUnit']; }

  setErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
