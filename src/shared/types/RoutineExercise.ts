import { Exercise } from './Exercise';

export type RoutineExercise = {
  exercise: Exercise
  weight: string;
  sets: number;
  quantity: number;
  quantityUnit: string;
}
