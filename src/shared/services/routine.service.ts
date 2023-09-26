import { Injectable } from '@angular/core';
import { Exercise, Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RoutineService {
  private apiUrl = 'http://localhost:8080';
  private routine: Routine = {
    name: '',
    exercises: []
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
    return this.http.post(`${this.apiUrl}/createRoutine`, this.routine);
  }

  resetRoutine() {
    this.routine = { name: '', exercises: [] };
  }
}
