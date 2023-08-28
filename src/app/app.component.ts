import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../scss/custom-theme.scss']
})
export class AppComponent implements OnInit {
  title = 'iron-track';
  showFooter: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showFooter = this.activatedRoute.firstChild?.snapshot.data['showFooter'] !== false;
      });
  }
}
