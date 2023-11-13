import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutSetService } from 'src/shared/services/workout-set.service';
import { WorkoutService } from 'src/shared/services/workout.service';
import { RoutineExercise } from 'src/shared/types/RoutineExercise';
import { Workout, WorkoutSet } from 'src/shared/types/Workout';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  workout: Workout;
  currentSet: number = 0;
  sets?: WorkoutSet[];
  routineExercise?: RoutineExercise;
  weight?: string;
  quantity?: string;
  name?: string;
  inWorkout: boolean = !!localStorage.getItem('currentSet');

  beginSet() {
    if (this.routineExercise !== undefined) {
      this.workoutSetService.setRoutineExercise(this.routineExercise);
    } else {
      console.error('Routine Exercise not found');
    }

    const localStorageSets = localStorage.getItem('sets');
    const jsonSets: WorkoutSet[] = JSON.parse(localStorageSets ?? '[]');
    const thisWorkoutSet = jsonSets.filter(workout => this.routineExercise?.id === workout.routineExercise?.id);
    this.currentSet = thisWorkoutSet.length;
    this.sets = [...thisWorkoutSet, ...(this.sets?.slice(thisWorkoutSet.length) ?? [])];
    localStorage.setItem('sets', JSON.stringify(jsonSets));

    console.log('starting workout', this.sets);

    this.workoutSetService.setSessionStart(new Date().getTime());
    this.workoutSetService.setWorkout(this.workout);

    if (this.workout.id !== undefined) {
      this.workoutSetService.startSession(this.workout.id).subscribe({
        next: (res: WorkoutSet) => {
          this.workoutSetService.setId(res.id);
          localStorage.setItem('currentSet', JSON.stringify(this.workoutSetService.getSet()));
          this.inWorkout = true;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete block (begin)', this.sets);
        }
      });
    } else {
      console.error('Workout not found');
    }
  }

  endSet() {
    this.inWorkout = false;

    if (this.workout.id !== undefined) {
      this.workoutSetService.endSession(this.workout.id).subscribe({
        next: () => {
          const localStorageSets = localStorage.getItem('sets');
          const jsonSets: WorkoutSet[] = JSON.parse(localStorageSets ?? '[]');
          console.log('in end set', this.workoutSetService.getSet());
          jsonSets.push(this.workoutSetService.getSet());
          const thisWorkoutSet = jsonSets.filter(workout => this.routineExercise?.id === workout.routineExercise?.id);
          this.currentSet = thisWorkoutSet.length;
          this.sets = [...thisWorkoutSet, ...(this.sets?.slice(thisWorkoutSet.length) ?? [])];
          localStorage.setItem('sets', JSON.stringify(jsonSets));
        },
        error: (_err) => {
          console.error(_err);
        },
        complete: () => {
          console.log('in completed block', this.sets);
        }
      });
    }
  }

  calculateTimeDifference(sessionStart: number, sessionEnd?: number): string {
    if (sessionEnd !== undefined) {
      const timeDifferenceSeconds = Math.floor((sessionEnd - sessionStart) / 1000);

      const minutes = String(Math.floor(timeDifferenceSeconds / 60)).padStart(2, '0');
      const seconds = String((timeDifferenceSeconds % 60)).padStart(2, '0');

      return `${minutes}:${seconds}`;
    } else {
      return '00:00';
    }
  }

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private workoutSetService: WorkoutSetService) {
    const routineExerciseId = route.snapshot.params['routine_exercise_id'];
    this.workout = workoutService.getWorkout();

    this.routineExercise = this.workout.routine?.exercises.find(exercise => exercise.id == routineExerciseId);

    this.sets = new Array(this.routineExercise?.sets);
    this.weight = this.routineExercise?.weight;
    this.quantity = `${this.routineExercise?.quantity} ${this.routineExercise?.quantityUnit.slice(0, 1).toUpperCase()}${this.routineExercise?.quantityUnit.slice(1)}(s)`;
    this.name = this.routineExercise?.exercise.name;
  }

  ngOnInit(): void {
    const localStorageSets = localStorage.getItem('sets');
    const jsonSets: WorkoutSet[] = JSON.parse(localStorageSets ?? '[]');
    const thisWorkoutSet = jsonSets.filter(workout => this.routineExercise?.id === workout.routineExercise?.id);
    this.currentSet = thisWorkoutSet.length;
    this.sets = [...thisWorkoutSet, ...(this.sets?.slice(thisWorkoutSet.length) ?? [])];
    console.log('sets', this.sets);
  }

}
