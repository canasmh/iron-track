import { Injectable } from '@angular/core';
import { Workout } from '../types/Workout';
import { Routine } from '../types/Routine';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private workout: Workout;
  workoutFinished: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.workout = {
      sessionStart: new Date().getTime()
    };
  }

  setRoutine(routine: Routine) {
    this.workout.routine = routine;
  }

  setSessionStart(sessionStart: number) {
    this.workout.sessionStart = sessionStart;
  }

  setSessionEnd(sessionEnd: number) {
    this.workout.sessionEnd = sessionEnd;
  }

  setId(id: number | undefined) {
    this.workout.id = id;
  }

  setWorkout(workout: Workout) {
    this.workout = workout;
  }

  getWorkout() {
    return this.workout;
  }

  finishWorkout() {
    this.setSessionEnd(new Date().getTime());
    this.updateWorkout().subscribe({
      next: () => {
        localStorage.removeItem('workout');
      },
      error: (error) => {
        console.error(error);
        localStorage.removeItem('workout');
      },
      complete: () => {
        this.workoutFinished = true;
      }
    });
  }

  createWorkout(): Observable<any> {
    return this.http.post('/api/workout', this.workout, { headers: this.authService.getHeader() });
  }

  updateWorkout(): Observable<any> {
    return this.http.put('/api/workout', this.workout, { headers: this.authService.getHeader() });
  }
}
