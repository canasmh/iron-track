import { Routine } from './Routine';
import { RoutineExercise } from './RoutineExercise';

export type Workout = {
  id?: number,
  routine?: Routine,
  sessionStart: number,
  sessionEnd?: number,
};

export type WorkoutSet = {
  id?: number,
  workout?: Workout,
  routineExercise?: RoutineExercise,
  sessionStart: number,
  sessionEnd: number,
};
