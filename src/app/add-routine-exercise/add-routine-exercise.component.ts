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
import { RoutineExerciseService } from 'src/shared/services/routine-exercise.service';

@Component({
  selector: 'app-add-routine-exercise',
  templateUrl: './add-routine-exercise.component.html',
  styleUrls: ['./add-routine-exercise.component.scss']
})
export class AddRoutineExerciseComponent implements OnInit {
  private inputChanged$ = new Subject<string>();

  routineId: number = this.route.snapshot.params['routine_id'];

  addExerciseForm!: FormGroup;
  availableExercises: Exercise[] = [];
  workoutInputChanged = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  weightUnit: string = 'lbs';

  routineExercise?: RoutineExercise;
  exercise: Exercise = initExercise;
  reps: boolean = true;
  submittedExercise = false;

  addExercise() {
    this.submittedExercise = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.workoutInputChanged) {
      this.errorMessage = 'Invalid workout selected';
    } else if (!this.addExerciseForm.invalid) {
      console.log('exercise', this.exercise);
      this.routineExercise = {
        exercise: this.exercise,
        weight: this.weight.value + ' ' + this.weightUnit,
        sets: this.sets.value,
        quantity: this.quantity.value,
        quantityUnit: this.quantityUnit.value
      };

      this.routineExerciseService.addRoutineExercise(this.routineId, this.routineExercise).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/routines', this.routineId, 'edit']);
        },
        error: (error) => {
          // this.errorMessage = error.error.message;
          console.error(error);
        }
      });
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
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService,
    private routineExerciseService: RoutineExerciseService,
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
