import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutinesService } from '../shared/services/RoutinesService';
import { Routine } from '../shared/types/customTypes';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  routine: Routine = {
    name: 'Chest & Biceps',
    exercises: [
      {
        workout: 'Bench Press',
        weight: "175",
        weightUnit: "lbs",
        sets: "3",
        quantity: "10",
        unit: "reps",
      },
      {
        workout: 'Bicep Curl',
        weight: "25",
        weightUnit: "lbs",
        sets: "3",
        quantity: "10",
        unit: "reps",
      },
      {
        workout: 'Push up',
        weight: "0",
        weightUnit: "lbs",
        sets: "3",
        quantity: "30",
        unit: "sec",
      },
      {
        workout: 'Hammer Curl',
        weight: "25",
        weightUnit: "lbs",
        sets: "3",
        quantity: "30",
        unit: "sec",
      },
      {
        workout: 'Pec Flys',
        weight: "125",
        weightUnit: "lbs",
        sets: "3",
        quantity: "10",
        unit: "reps",
      },
      {
        workout: 'Preacher Curl',
        weight: "50",
        weightUnit: "lbs",
        sets: "3",
        quantity: "30",
        unit: "sec",
      },
    ]
  };

  constructor(private route: ActivatedRoute, private routinesService: RoutinesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const all_routines = this.routinesService.getRoutines();
      all_routines.push(this.routine);
      this.routine = all_routines.filter(routine => routine.name === params['routine_name'])[0];
    })
  }

}
