import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../types/Login';
import { Signup } from '../types/Signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  signup(signup: Signup): Observable<any> {

    return this.http.post('/api/auth/signup', signup, { ...this.headers });
  }

  login(login: Login): Observable<any> {
    return this.http.post('/api/auth/login', login, { ...this.headers });
  }
}
