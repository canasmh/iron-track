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
  routineId: string = this.route.snapshot.params['routine_id'];

  navigateToProfile() {
    this.router.navigate(['/profile']);

  }

  ngOnInit(): void {
  }
}

