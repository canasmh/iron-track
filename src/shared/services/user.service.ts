import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  getUser(userId: number):Observable<any> {
    return this.http.get(`/api/routines/${userId}`,{ headers:this.authService.getHeader() });
  }

  editUser(userId: number | undefined):Observable<any> {
    return this.http.put(`/api/routines/${userId}`,{ headers:this.authService.getHeader() });
  }

  deleteUser(userId: number | undefined):Observable<any> {
    return this.http.delete(`/api/routines/${userId}`,{ headers:this.authService.getHeader() });
  }
}
