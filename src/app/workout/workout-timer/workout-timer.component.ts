import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/shared/services/workout.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-workout-timer',
  template: '<span>{{ timeElapsed }}</span>',
  styleUrls: ['./workout-timer.component.scss']
})
export class WorkoutTimerComponent implements OnInit {
  timeElapsed: string;
  constructor(private workoutService: WorkoutService) {
    this.timeElapsed = this.calculateTimeDifference();
  }

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.timeElapsed = this.calculateTimeDifference();
    });
  }

  calculateTimeDifference(): string {
    const sessionStart = this.workoutService.getWorkout().sessionStart;
    const currentTime = new Date().getTime();
    const timeDifferenceSeconds = Math.floor((currentTime - sessionStart) / 1000);

    const minutes = String(Math.floor(timeDifferenceSeconds / 60)).padStart(2, '0');
    const seconds = String((timeDifferenceSeconds % 60)).padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
