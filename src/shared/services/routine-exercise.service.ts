import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineExerciseService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  delete(routine_id: number | undefined, routine_exercise_id: number| undefined): Observable<any> {
    return this.http.delete(`/api/routines/${routine_id}/${routine_exercise_id}`, { headers: this.authService.getHeader() });
  }
}
