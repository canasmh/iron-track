import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutinesService } from '../../shared/services/routines.service';
import { Routine } from 'src/shared/types/Routine';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})

export class RoutineComponent {

  routine: Routine;
  routineId: number;
  expand: boolean[];

  handleExpand(i: number) {
    this.expand[i] = !this.expand[i];
  }

  constructor(private route: ActivatedRoute, private routinesService: RoutinesService) {
    this.routineId = this.route.snapshot.params['routine_id'];
    const routines = this.routinesService.getRoutines();
    this.routine = routines.filter(routine => routine.id == this.routineId)[0];
    this.expand = this.routine.exercises.map(() => false);
  }
}
