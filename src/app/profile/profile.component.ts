import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/types/User';
import { Router } from '@angular/router';
import { OverlayService } from '../../shared/services/overlay.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isPasswordModalOpen: boolean = false;
  isEmailModalOpen: boolean = false;
  isNameModalOpen: boolean = false;
  newEmail: string = '';
  newPassword: string = '';
  newName: string = '';

  showPassword: boolean = false;
  user?: User;

  constructor(
    private userService: UserService,
    private router: Router,
    public overlayService: OverlayService,
    public overlayServicePass: OverlayService) {
  }

  openPasswordModal() {
    console.log('opening password modal');
    this.isPasswordModalOpen = true;
  }

  closePasswordModal() {
    console.log('closing modal');
    this.isPasswordModalOpen = false;
  }

  openEmailModal(){
    this.isEmailModalOpen = true;
  }

  closeEmailModal(){
    this.isEmailModalOpen = false;
  }

  openNameModal(){
    this.isNameModalOpen = true;
  }

  closeNameModal(){
    this.isNameModalOpen = false;
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res:User) => {
        console.log('profile res', res);
        this.user = res;
      },
      error: (err) => {
        console.log('error getting user', err);
      }
    });
  }

  logoutOfAccount() {
    localStorage.removeItem('token');
    location.reload();
    this.router.navigate(['/login']);

  }

  deleteProfile() {
    this.userService.deleteUser().subscribe((res) => {
      console.log('profile deleted successfully', res);
    }, (err) => {
      console.log('error deleting profile', err);
    });
    location.reload();

  }
}

