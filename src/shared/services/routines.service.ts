import { Injectable } from '@angular/core';
import { Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  private routines: Routine[] = [];

  constructor(private http: HttpClient) { }

  getRoutines() {
    return this.routines;
  }

  retrieveRoutines() {
    return this.http.get('/api/home');
  }

  addRoutine(routine: Routine) {
    this.routines = [...this.routines, routine];
  }
}
