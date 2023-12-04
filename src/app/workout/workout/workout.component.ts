import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';
import { Workout, WorkoutSet } from 'src/shared/types/Workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  private workoutId: string;
  workout: Workout;
  currentSet?: WorkoutSet;
  sets?: WorkoutSet[];
  setsCompleted?: Map<string, boolean> = new Map();

  isOpen: boolean = false;

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  finishWorkout() {
    this.workoutService.finishWorkout();
    this.isOpen = false;
    this.router.navigate(['/routines', this.workout.routine?.id]);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {
    const workoutJson = localStorage.getItem('workout');
    const workout: Workout = workoutJson ? JSON.parse(workoutJson) : null;
    this.workout = this.workoutService.getWorkout();

    this.workoutId = this.route.snapshot.params['workout_id'];

    if (workout) {
      if (String(workout.id) !== this.workoutId) {
        localStorage.removeItem('workout');
        this.router.navigate(['/routines']);
      } else {
        this.workoutService.setWorkout(workout);
      }
    } else {
      this.router.navigate(['/routines']);
    }
  }

  ngOnInit(): void {
    this.workout = this.workoutService.getWorkout();
    const setsLocalStorage = localStorage.getItem('sets');
    const setsJSONLocalStorage: WorkoutSet[] = JSON.parse(setsLocalStorage ?? '[]');
    const routineExerciseIds = new Set();
    setsJSONLocalStorage.forEach((workoutSet) => {
      routineExerciseIds.add(workoutSet.routineExercise?.id);
    });
    routineExerciseIds.forEach(id => {
      const currentExercise: WorkoutSet[] | undefined = setsJSONLocalStorage.filter(set => id === set.routineExercise?.id);
      const nSets = currentExercise.length;
      const routineExerciseId = currentExercise[0].routineExercise?.id?.toString() ?? '';
      this.setsCompleted?.set(routineExerciseId,  currentExercise[0].routineExercise?.sets === nSets);
    });

    console.log('sets completed', this.setsCompleted);

    this.currentSet = JSON.parse(localStorage.getItem('currentSet') ?? '{}');
  }

}
