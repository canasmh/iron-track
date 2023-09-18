import { Component } from '@angular/core';
import { Routine } from '../../shared/types/customTypes';
import { RoutinesService } from '../../shared/services/RoutinesService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  routines: Routine[];

  constructor(private routinesService: RoutinesService) {
    this.routines = this.routinesService.getRoutines();
  }
}
