import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Signup} from "../../shared/types/Signup";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/types/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  password: string = '';
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, public user: User, private userService: UserService) {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  editProfile() {
    this.userService.editUser(this.user.id).subscribe((res) => {
      console.log('profile edited successfully', res);
    },(err) => {
      console.log('error editing profile', err);
    });

  }

  logoutOfAccount() {

  }

  deleteProfile() {
    this.userService.deleteUser(this.user.id).subscribe((res) => {
      console.log('profile deleted successfully', res);
    }, (err) => {
      console.log('error deleting profile', err);
    });

  }

  ngOnInit(): void {

  }
}

