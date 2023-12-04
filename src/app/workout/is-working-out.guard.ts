import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';

export const isWorkingOutGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);
  const hasLocalStorage = !!localStorage.getItem('workout');

  if (hasLocalStorage) {

    if (workoutService.getWorkout().sessionEnd) {
      return true;
    }

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

export const isNotWorkingOutGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);
  const router = inject(Router);

  if (localStorage.getItem('workout') && workoutService.getWorkout().id == route.params['workout_id']) {
    return true;
  } else {
    router.navigate(['routines']);

    return false;
  }
};
