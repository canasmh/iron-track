import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../types/Login';
import { Signup } from '../types/Signup';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private header: HttpHeaders;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    const token = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      this.header = this.header.append('Authorization', `Bearer ${token}`);
    }
  }
  setTokenAndLocalStorage(token: string): void {
    this.tokenService.setToken(token);
    localStorage.setItem('token', token);
  }

  next(data: { token: string }): void {
    this.setTokenAndLocalStorage(data.token);
  }

  getHeader() {
    return this.header;
  }

  addHeader(name: string, value: string) {
    this.header = this.header.delete(name).append(name, value);
  }

  deleteHeader(name: string) {
    this.header = this.header.delete(name);
  }

  signup(signup: Signup): Observable<any> {

    return this.http.post('/api/auth/signup', signup, { headers: this.header });
  }

  login(login: Login): Observable<any> {

    return this.http.post('/api/auth/login', login, { headers: this.header });
  }

  isAuthenticated() {
    return this.http.get('/api/token', { headers: this.header });
  }

}
