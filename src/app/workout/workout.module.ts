import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutTimerComponent } from './workout-timer/workout-timer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    WorkoutComponent,
    WorkoutTimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class WorkoutModule { }
