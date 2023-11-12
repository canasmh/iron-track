import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }
  private userId: string = this.route.snapshot.params['user_id'];

  navigateToProfile() {
    this.userService.getUser(this.userId).subscribe((user) => {
      this.router.navigate([`/profile/${user}`], { state: { data: user } });
    },
    (err: any) => {
      console.error('error getting user information', err);
    });

  }

  ngOnInit(): void {
  }

}
