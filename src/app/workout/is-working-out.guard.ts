import { inject } from '@angular/core';
import {  CanActivateFn } from '@angular/router';
import { WorkoutService } from 'src/shared/services/workout.service';

export const isWorkingOutGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);
  console.log('in workout', route.params);

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

export const isNotWorkingOutGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);
  console.log('in not workout', route.params);

  return true;
};
