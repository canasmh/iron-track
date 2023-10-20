import { RoutineExercise } from './RoutineExercise';

export type Routine = {
  id?: number,
  name: string,
  exercises: RoutineExercise[]
};
