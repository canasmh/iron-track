import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkIfNumber, isGreaterThanZero } from '../../shared/validators/customValidators';
import { Exercise, ExerciseApi } from '../../shared/types/customTypes';
import { RoutineService } from '../../shared/services/routine.service';
import { ExercisesApiService } from '../../shared/services/exercises-api.service';
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
  availableExercises: string[] = [];
  workoutInputChanged = true;
  errorMessage?: string | null;
  successMessage: string | null = null;
  weightUnit: string = 'lbs';

  initExercise: Exercise = {
    name: '',
    weight: '',
    sets: '',
    quantity: '',
    quantityUnit: 'rep'
  };

  exercises: Exercise[] = [];
  nExercises = this.exercises.length;
  reps: boolean = true;
  submittedExercise = false;

  addExercise() {
    this.submittedExercise = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.workoutInputChanged) {
      this.errorMessage = 'Invalid workout selected';
    } else if (!this.addExerciseForm.invalid) {
      this.exercises.push(this.addExerciseForm.value);
      this.addExerciseForm.patchValue(this.initExercise);
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

    if (this.exercises.length > 0) {
      this.routineService.setExercises(this.exercises);
      this.router.navigate(['/home/add-routine/final']);
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

  selectExercise(name: string) {
    this.addExerciseForm.controls['name'].setValue(name);
    this.addExerciseForm.controls['name'].markAsPristine();
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
      .subscribe((data: ExerciseApi[]) => {
        this.availableExercises = data.map(exercise => exercise.name).slice(0, 5);
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

  setErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
