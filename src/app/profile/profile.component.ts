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

  openEditUserName() {
    this.overlayService.showOverlay();
  }

  openEditPassword() {
    this.overlayServicePass.showOverlayPass();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((res:User) => {
      this.user = res;
    }, (err) => {
      console.log('error getting user', err);
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

  }
}

