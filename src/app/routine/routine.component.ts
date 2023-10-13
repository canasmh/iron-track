import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutinesService } from '../../shared/services/routines.service';
import { Routine } from 'src/shared/types/Routine';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})

export class RoutineComponent implements OnInit {

  routine: Routine;
  expand: boolean[];

  handleExpand(i: number) {
    this.expand[i] = !this.expand[i];
  }

  constructor(private route: ActivatedRoute, private routinesService: RoutinesService) {
    const routineName = this.route.snapshot.params['routine_name'];
    this.routine = this.routinesService.getRoutines().filter(routine => routine.name === routineName)[0];
    this.expand = this.routine.exercises.map(() => false);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const all_routines = this.routinesService.getRoutines();
      this.routine = all_routines.filter(routine => routine.name === params['routine_name'])[0];
    });
  }
}
