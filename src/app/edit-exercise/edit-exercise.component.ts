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
      this.routineExercise = {
        exercise: this.exercise,
        weight: `${this.weight.value} ${this.weightUnit}`,
        sets: this.sets.value,
        quantity: this.quantity.value,
        quantityUnit: this.quantityUnit.value
      };
      this.routineExerciseService.editRoutineExercise(this.routineId,this.routineExerciseId,this.routineExercise).subscribe({
        next: () =>{
          this.router.navigate(['/routines',this.routineId, 'edit']);
        },
        error: (error)=>{
          console.error(error);
          this.errorMessage = error.error.message;
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
  ) { }

  ngOnInit(): void {

    this.editExerciseForm = new FormGroup({
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

    this.routineExerciseService.getRoutineExercise(this.routineId, this.routineExerciseId).subscribe({
      next: (data:{routineExercise:RoutineExercise}) => {
        this.routineExercise = data.routineExercise;
        this.exercise = data.routineExercise.exercise;
        this.editExerciseForm.patchValue({
          name:this.exercise.name,
          weight:this.routineExercise.weight.split(' ')[0],
          sets:this.routineExercise.sets,
          quantity:this.routineExercise.quantity,
          quantityUnit:this.routineExercise.quantityUnit
        });
        this.workoutInputChanged = false;
      },
      error: err => {
        console.error(err);
      }
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
