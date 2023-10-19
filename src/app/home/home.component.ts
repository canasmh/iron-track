import { Component } from '@angular/core';
import { Routine } from 'src/shared/types/Routine';
import { RoutinesService } from '../../shared/services/routines.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  routines: Routine[];

  constructor(private routinesService: RoutinesService) {
    this.routines = [];
    this.routinesService.retrieveRoutines().subscribe({
      next: (data) => {
        console.log(data.routines);
        this.routinesService.setRoutines(data.routines);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.routines = this.routinesService.getRoutines();
      }
    });
  }
}
