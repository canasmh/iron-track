import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';

export const isWorkingOutGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);

  if (localStorage.getItem('workout') && !workoutService.workoutFinished) {

    if (window.confirm('Are you sure you want to leave? Proceeding will automatically end your workout')) {
      workoutService.finishWorkout();

      return true;

    } else {
      return false;
    }
  } else {
    return true;
  }
};
