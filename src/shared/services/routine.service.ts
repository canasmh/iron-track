import { Injectable } from '@angular/core';
import { Exercise, Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoutineService {

  private routine: Routine = {
    name: '',
    exercises: []
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

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
    return this.http.post('/api/home/createRoutine', this.routine, { headers: this.authService.getHeader() });
  }

  resetRoutine() {
    this.routine = { name: '', exercises: [] };
  }
}
