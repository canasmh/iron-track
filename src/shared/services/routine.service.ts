import { Injectable } from '@angular/core';
import { Exercise, Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RoutineService {

  private routine: Routine = {
    name: 'Chest Day',
    exercises: [
      {
        name: 'Bench Press',
        weight: '150 lbs',
        sets: '3',
        quantity: '30',
        quantityUnit: 'sec'
      },
      {
        name: 'Pec Fly',
        weight: '150 lbs',
        sets: '3',
        quantity: '10',
        quantityUnit: 'reps'
      },
      {
        name: 'Incline Dumbell Press',
        weight: '150 lbs',
        sets: '3',
        quantity: '30',
        quantityUnit: 'sec'
      }
    ]
  };

  constructor(private http: HttpClient) { }

  getExercises() {
    return this.routine.exercises;
  }

  setExercise(exercise: Exercise) {
    this.routine.exercises = [...this.routine.exercises, exercise];
  }

  setExercises(exercises: Exercise[]) {
    this.routine.exercises = exercises;
  }

  getRoutineName() {
    return this.routine.name;
  }

  setRoutineName(name: string) {
    this.routine.name = name;
  }

  getRoutine() {
    return this.routine;
  }

  createRoutine() {
    return this.http.post('/api/createRoutine', this.routine);
  }

  resetRoutine() {
    this.routine = { name: '', exercises: [] };
  }
}
