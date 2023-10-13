import { Injectable } from '@angular/core';
import { Routine } from '../types/Routine';
import { HttpClient } from '@angular/common/http';
import { RoutineService } from './routine.service';

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

  setRoutines(routines: Routine[]) {
    this.routines = routines;
  }

  retrieveRoutines() {
    return this.http.get('/api/home');
  }
}
