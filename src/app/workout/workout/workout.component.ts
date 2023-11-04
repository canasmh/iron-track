import { Component, HostListener, OnInit } from '@angular/core';
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
  isPageReload: boolean = false;

  finishWorkout() {
    this.workoutService.finishWorkout();
    this.router.navigate(['/routines', this.workout.routine?.id]);
  }

  @HostListener('window:beforeunload', ['$event'])
  confirmNavigation($event: any) {

    if (this.isPageReload) {

      return;
    }

    $event.preventDefault();

    if (!this.workoutService.workoutFinished) {
      $event.returnValue = this.workoutService.finishWorkout();
    }

    return $event;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {
    const type = performance.getEntriesByType('navigation')[0].toJSON().type;

    if (type === 'reload') {
      this.isPageReload = true;
    } else {
      this.isPageReload = false;
    }

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
