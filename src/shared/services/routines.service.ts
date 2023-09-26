import { Injectable } from '@angular/core';
import { Routine } from '../types/customTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  private routines: Routine[] = [];
  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getRoutines() {
    return this.routines;
  }

  retrieveRoutines() {
    return this.http.get(`${this.apiUrl}/home`);
  }

  addRoutine(routine: Routine) {
    this.routines = [...this.routines, routine];
  }
}
