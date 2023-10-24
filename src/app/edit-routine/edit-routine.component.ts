import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routine } from 'src/shared/types/Routine';
import { RoutineService } from 'src/shared/services/routine.service';
import { RoutineExercise } from '../../shared/types/RoutineExercise';

@Component({
  selector: 'app-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss']
})

export class EditRoutineComponent {

  editRoutine: Routine;
  expand: boolean[];

  handleExpand(i: number) {
    this.expand[i] = !this.expand[i];
  }

  constructor(private route: ActivatedRoute, private router: Router,private routineService: RoutineService) {
    const routineId = this.route.snapshot.params['routine_id'];
    this.editRoutine = { name: '', exercises: [] };
    this.routineService.retrieveRoutine(routineId).subscribe({
      next: (data: {routine: Routine}) => {
        this.editRoutine = data.routine;
      },
      error: (error) => {

        if (error.error.statusCode === 404) {
          console.error('Routine was not found', error);
        } else if (error.error.statusCode === 403) {
          console.error('User not authorized to view resource', error);
        } else {
          console.error('Unhandled error', error);
        }

      }
    });

    this.expand = this.editRoutine.exercises.map(() => false);
  }
}
