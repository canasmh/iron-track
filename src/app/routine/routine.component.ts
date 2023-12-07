import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routine } from 'src/shared/types/Routine';
import { RoutineService } from 'src/shared/services/routine.service';
import { Workout } from 'src/shared/types/Workout';
import { WorkoutService } from 'src/shared/services/workout.service';
import { Exercise } from 'src/shared/types/Exercise';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})

export class RoutineComponent {

  routine: Routine;
  expand: boolean[];
  currentExercise?: Exercise;
  showModal: boolean = false;

  handleExpand(i: number) {
    this.expand[i] = !this.expand[i];
  }

  openModal(id: number | undefined) {
    this.currentExercise = this.routine.exercises.find(exercise => exercise.id == id)?.exercise;
    this.showModal = true;
  }

  closeModal() {
    this.currentExercise = undefined;
    this.showModal = false;
  }

  beginWorkout() {
    this.workoutService.setRoutine(this.routine);
    this.workoutService.setSessionStart(new Date().getTime());
    this.workoutService.createWorkout().subscribe({
      next: (res: Workout) => {
        this.workoutService.setId(res.id);
        localStorage.setItem('workout', JSON.stringify(this.workoutService.getWorkout()));
        this.router.navigate(['/workout', res.id]);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private routineService: RoutineService, private workoutService: WorkoutService) {
    const routineId = this.route.snapshot.params['routine_id'];
    this.routine = { name: '', exercises: [] };
    this.routineService.retrieveRoutine(routineId).subscribe({
      next: (data: {routine: Routine}) => {
        this.routine = data.routine;
      },
      error: (error) => {
        this.router.navigate(['/routines']);

        if (error.error.statusCode === 404) {
          console.error('Routine was not found', error);
        } else if (error.error.statusCode === 403) {
          console.error('User not authorized to view resource', error);
        } else {
          console.error('Unhandled error', error);
        }
      }

    });

    this.expand = this.routine.exercises.map(() => false);
  }
}
