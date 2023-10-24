import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineExerciseService {

  getRoutineExercise(routineId: string, routineExerciseId: string):Observable<any> {
    return this.http.get(`/routines/${routineId}/edit/${routineExerciseId}`,{ headers:this.authService.getHeader() });
  }

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }
}

