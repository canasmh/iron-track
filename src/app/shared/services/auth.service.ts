import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { User, UserCredentials } from '../types/customTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user)
  }

  login(user: UserCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user)
  }
}


