import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCredentials } from '../types/customTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {

    return this.http.post('/api/auth/signup', user, { ...this.headers });
  }

  login(user: UserCredentials): Observable<any> {
    return this.http.post('/api/auth/login', user, { ...this.headers });
  }
}
