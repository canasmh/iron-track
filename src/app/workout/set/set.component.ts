import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';
import { RoutineExercise } from 'src/shared/types/RoutineExercise';
import { Workout, WorkoutSet } from 'src/shared/types/Workout';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent {

  workout: Workout;
  sets?: WorkoutSet[];
  weight?: string;
  quantity?: string;
  name?: string;

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService) {
    const routineExerciseId = route.snapshot.params['routine_exercise_id'];
    this.workout = workoutService.getWorkout();

    const routineExercise: RoutineExercise | undefined = this.workout.routine?.exercises.find(exercise => exercise.id == routineExerciseId);

    this.sets = new Array(routineExercise?.sets);
    this.weight = routineExercise?.weight;
    this.quantity = `${routineExercise?.quantity} ${routineExercise?.quantityUnit.slice(0, 1).toUpperCase()}${routineExercise?.quantityUnit.slice(1)}(s)`;
    this.name = routineExercise?.exercise.name;
  }

}
