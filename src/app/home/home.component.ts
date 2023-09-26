import { Component } from '@angular/core';
import { Routine } from '../../shared/types/customTypes';
import { RoutinesService } from '../../shared/services/routines.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  routines: Routine[];

  constructor(private routinesService: RoutinesService) {
    this.routinesService.retrieveRoutines().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.error(e);
      }
    });

    this.routines = this.routinesService.getRoutines();
  }
}
