import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authToken: string | null = null;

  setToken(token: string) {
    this.authToken = token;
  }

  getToken() {
    return this.authToken;
  }
  constructor() { }
}
