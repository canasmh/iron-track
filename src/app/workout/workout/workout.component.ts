import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';
import { Workout } from 'src/shared/types/Workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  private workoutId: string;
  workout: Workout;

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
  }

}
