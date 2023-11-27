import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private newUsername: any;
  private newPassword: any;

  constructor(private http: HttpClient, private authService:AuthService) { }

  getUser() : Observable<any> {
    return this.http.get('/api/profile',{ headers:this.authService.getHeader() });
  }

  editUser():Observable<any> {
    return this.http.put(`/api/profile/${(this.newUsername)}`,{ headers:this.authService.getHeader() });
  }

  editPassword():Observable<any> {
    return this.http.put(`/api/profile/${(this.newPassword)}`,{ headers:this.authService.getHeader() });
  }

  deleteUser():Observable<any> {
    return this.http.delete('/api/profile',{ headers:this.authService.getHeader() });
  }

}
