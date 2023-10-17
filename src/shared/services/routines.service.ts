import { Injectable } from '@angular/core';
import { Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';
import { RoutineService } from './routine.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  private routines: Routine[];

  constructor(private http: HttpClient, private routineService: RoutineService) {
    this.routines = [];
  }

  getRoutines() {
    return this.routines;
  }

  retrieveRoutines() {
    return this.http.get('/api/home', { headers: this.authService.getHeader() });
  }

  addRoutine(routine: Routine) {
    this.routines = [...this.routines, routine];
  }
}
