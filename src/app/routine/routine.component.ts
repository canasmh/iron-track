import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutinesService } from '../../shared/services/RoutinesService';
import { Routine } from '../../shared/types/customTypes';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  routine?: Routine;

  constructor(private route: ActivatedRoute, private routinesService: RoutinesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const all_routines = this.routinesService.getRoutines();
      this.routine = all_routines.filter(routine => routine.name === params['routine_name'])[0];
    });
  }
}
