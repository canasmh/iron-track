import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

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
    console.log(user);

    return this.http.put('/api/profile/editemail', { email: user.email }, { headers:this.authService.getHeader() });
  }

  editPassword(user: { password: string }, newPassword: string):Observable<any> {
    return this.http.put( '/api/profile/editpassword', { oldPassword: user.password, newPassword:newPassword }, { headers:this.authService.getHeader() });
  }

  deleteUser():Observable<any> {
    return this.http.delete('/api/profile',{ headers:this.authService.getHeader() });
  }

  editName(user: { name: string}):Observable<any> {
    return this.http.put('/api/profile/editname', { name: user.name },{ headers:this.authService.getHeader() });
  }

}
