import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { WorkoutSetService } from 'src/shared/services/workout-set.service';

@Component({
  selector: 'app-set-timer',
  template: '<span>{{ timeElapsed }}</span>',
  styleUrls: []
})
export class SetTimerComponent implements OnInit {

  timeElapsed: string;
  constructor(private workoutSetService: WorkoutSetService) {
    this.timeElapsed = this.calculateTimeDifference();
  }

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.timeElapsed = this.calculateTimeDifference();
    });
  }

  calculateTimeDifference(): string {
    const sessionStart = this.workoutSetService.getSet().sessionStart;
    const currentTime = new Date().getTime();
    const timeDifferenceSeconds = Math.floor((currentTime - sessionStart) / 1000);

    const minutes = String(Math.floor(timeDifferenceSeconds / 60)).padStart(2, '0');
    const seconds = String((timeDifferenceSeconds % 60)).padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

}
