import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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

  editUser():Observable<any> {
    return this.http.put(`/api/profile/${(this.newEmail)}`,{ headers:this.authService.getHeader() });
  }

  editPassword():Observable<any> {
    return this.http.put(`/api/profile/${(this.newPassword)}`,{ headers:this.authService.getHeader() });
  }

  deleteUser():Observable<any> {
    return this.http.delete('/api/profile',{ headers:this.authService.getHeader() });
  }

  editName():Observable<any> {
    return this.http.put(`/api/profile/${(this.newName)}`,{ headers:this.authService.getHeader() });
  }

}
