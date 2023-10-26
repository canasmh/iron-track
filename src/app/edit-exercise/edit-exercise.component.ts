import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { checkIfNumber, isGreaterThanZero } from '../../shared/validators/customValidators';
import { RoutineExercise } from 'src/shared/types/RoutineExercise';
import { Exercise, initExercise } from 'src/shared/types/Exercise';
import { RoutineService } from '../../shared/services/routine.service';
import { ExercisesApiService } from '../../shared/services/apiNinjas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ErrorMessageService } from '../../shared/services/error-message.service';
import { RoutineExerciseService } from '../../shared/services/routine-exercise.service';
import {Routine} from "../../shared/types/Routine";

@Component({
  selector: 'app-routine',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})

export class EditExerciseComponent implements OnInit {
  private inputChanged$ = new Subject<string>();
  routineId: string = this.route.snapshot.params['routine_id'];
  routineExerciseId: string = this.route.snapshot.params['routineExercise_id'];

  editExerciseForm!: FormGroup;
  availableExercises: Exercise[] = [];
  workoutInputChanged = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  weightUnit: string = 'lbs';

  exercise: Exercise = initExercise;
  reps: boolean = true;
  submittedExercise = false;
  routineExercise?: RoutineExercise;

  saveExercise() {
    this.submittedExercise = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.workoutInputChanged) {
      this.errorMessage = 'Invalid workout selected';
    } else if (!this.editExerciseForm.invalid) {
      // add exercises to the local routineExercises
      // reset form values
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

  searchExercises() {
    const exerciseName = this.editExerciseForm.value.name;

    if (this.editExerciseForm.controls['name'].dirty) {
      this.workoutInputChanged = true;
    }

    if (this.workoutInputChanged) {
      this.inputChanged$.next(exerciseName);
    }
  }

  selectExercise(exercise: Exercise) {
    this.editExerciseForm.controls['name'].setValue(exercise.name);
    this.editExerciseForm.controls['name'].markAsPristine();
    this.availableExercises = [];
    this.workoutInputChanged = false;
    this.exercise = exercise;
  }

  constructor(
    private router: Router,
    private routineService: RoutineService,
    private exercisesService: ExercisesApiService,
    private errorMessageService: ErrorMessageService,
    private routineExerciseService: RoutineExerciseService,
    private route: ActivatedRoute
  ) {
    this.routineExerciseService.getRoutineExercise(this.routineId, this.routineExerciseId).subscribe({
      next: (data:{routineExercise:RoutineExercise}) => {
        this.routineExercise = data.routineExercise;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if (this.routineExercise) {
      this.editExerciseForm = new FormGroup({
        name: new FormControl(this.routineExercise?.exercise.name, [
          Validators.required
        ]),
        weight: new FormControl(this.routineExercise?.weight, [
          Validators.required,
          checkIfNumber()
        ]),
        sets: new FormControl(this.routineExercise?.sets, [
          Validators.required,
          checkIfNumber(),
          isGreaterThanZero()
        ]),
        quantity: new FormControl(this.routineExercise?.quantity, [
          Validators.required,
          checkIfNumber(),
          isGreaterThanZero()
        ]),
        quantityUnit: new FormControl(this.routineExercise?.quantityUnit, [
          Validators.required
        ])
      });
    }

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

    this.editExerciseForm.valueChanges.subscribe(status => {
      this.reps = status.quantityUnit === 'rep';
      this.submittedExercise = false;
      this.successMessage = null;
    });
  }

  get name() { return this.editExerciseForm.controls['name']; }
  get weight() { return this.editExerciseForm.controls['weight']; }
  get sets() { return this.editExerciseForm.controls['sets']; }
  get quantity() { return this.editExerciseForm.controls['quantity']; }
  get quantityUnit() { return this.editExerciseForm.controls['quantityUnit']; }

  setErrorMessage(field: AbstractControl, fieldName: string) {
    this.errorMessage = this.errorMessageService.getErrorMessage(field, fieldName);
  }
}
