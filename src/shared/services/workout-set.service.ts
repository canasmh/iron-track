import { Injectable } from '@angular/core';
import { Workout, WorkoutSet } from '../types/Workout';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { RoutineExercise } from '../types/RoutineExercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSetService {

  private set: WorkoutSet;
  private hasLocalStorage: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const localStorageSet = localStorage.getItem('currentSet');
    this.hasLocalStorage = !!localStorageSet;
    this.set = JSON.parse(localStorageSet ?? '{}');
  }

  setRoutineExercise(routineExercise: RoutineExercise) {
    this.set.routineExercise = routineExercise;
  }

  setWorkout(workout: Workout) {
    this.set.workout = workout;
  }

  setSessionStart(sessionStart: number) {
    this.set.sessionStart = sessionStart;
    this.set.sessionEnd = undefined;
  }

  private setSessionEnd(sessionEnd: number) {
    this.set.sessionEnd = sessionEnd;
  }

  setId(id: number | undefined) {
    this.set.id = id;
  }

  getSet() {
    return this.set;
  }

  startSession(workoutId: number): Observable<any> {
    return this.http.post(`/api/workout/${workoutId}`, this.set, { headers: this.authService.getHeader() });
  }

  endSession(workoutId: number): Observable<any> {
    this.setSessionEnd(new Date().getTime());
    localStorage.removeItem('currentSet');

    return this.http.put(`/api/workout/${workoutId}`, this.set, { headers: this.authService.getHeader() });
  }
}
