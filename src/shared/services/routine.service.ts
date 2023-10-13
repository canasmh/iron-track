import { Injectable } from '@angular/core';
import { Routine } from '../types/Routine';
import { HttpClient } from '@angular/common/http';
import { RoutineExercise } from '../types/RoutineExercise';

@Injectable({
  providedIn: 'root'
})

export class RoutineService {

  private routine: Routine;

  constructor(private http: HttpClient) {
    this.routine = {
      name: '',
      exercises: []
    };
  }

  setExercises(exercises: RoutineExercise[]) {

    this.routine.exercises = exercises;
  }

  setName(name: string) {
    this.routine.name = name;
  }

  getRoutine() {
    return this.routine;
  }

  setRoutine(routine: Routine) {
    this.routine = routine;
  }

  resetRoutine() {
    this.routine = {
      name: '',
      exercises: []
    };
  }

  createRoutine() {
    return this.http.post('/api/createRoutine', this.routine);
  }
}
