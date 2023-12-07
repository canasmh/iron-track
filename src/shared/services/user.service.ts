import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {Login} from "../types/Login";
import {User} from "../types/User";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private newEmail: any;
  private newPassword: any;
  private newName: any;

  constructor(private http: HttpClient, private authService:AuthService) { }

  getUser() : Observable<any> {
    return this.http.get('/api/profile',{ headers:this.authService.getHeader() });
  }

  editEmail(user: {email: string}):Observable<any> {
    console.log(user)
    return this.http.put(`/api/profile/editemail`,{email: user.email},{ headers:this.authService.getHeader() });
  }

  editPassword(user: { password: string }, oldPassword: string):Observable<any> {
    return this.http.put(`/api/profile/editpassword`, {password: user.password, oldPassword:oldPassword },{ headers:this.authService.getHeader() });
  }

  deleteUser():Observable<any> {
    return this.http.delete('/api/profile',{ headers:this.authService.getHeader() });
  }

  editName(user: { name: string}):Observable<any> {
    return this.http.put(`/api/profile/editname`, {name: user.name},{ headers:this.authService.getHeader() });
  }

}
