import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCredentials } from '../types/customTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post('/api/signup', user);
  }

  login(user: UserCredentials): Observable<any> {
    return this.http.post<UserCredentials>('/api/login', user, { responseType: 'json', observe: 'body' });
  }
}
