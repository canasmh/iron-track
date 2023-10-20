import { Exercise } from './Exercise';

export type RoutineExercise = {
  id?: number,
  exercise: Exercise
  weight: string;
  sets: number;
  quantity: number;
  quantityUnit: string;
}
