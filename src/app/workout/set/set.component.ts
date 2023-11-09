import { Component } from '@angular/core';
import { WorkoutService } from 'src/shared/services/workout.service';
import { Workout } from 'src/shared/types/Workout';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent {

  workout: Workout;
  constructor(private workoutService: WorkoutService) {
    this.workout = workoutService.getWorkout();
  }

}
