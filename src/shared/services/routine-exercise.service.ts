import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RoutineExercise } from '../types/RoutineExercise';

@Injectable({
  providedIn: 'root'
})
export class RoutineExerciseService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRoutineExercise(routineId: number, routineExerciseId: string): Observable<any> {
    return this.http.get(`/api/routines/${routineId}/edit/${routineExerciseId}`, { headers: this.authService.getHeader() });
  }

  addRoutineExercise(routineId: number, routineExercise: RoutineExercise): Observable<any> {
    return this.http.post(`/api/routines/${routineId}`, routineExercise, { headers: this.authService.getHeader() });
  }

  deleteRoutineExercise(routine_id: number | undefined, routine_exercise_id: number| undefined): Observable<any> {
    return this.http.delete(`/api/routines/${routine_id}/${routine_exercise_id}`, { headers: this.authService.getHeader() });
  }
}
