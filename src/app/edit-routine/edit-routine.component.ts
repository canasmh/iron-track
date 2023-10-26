import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from 'src/shared/services/routine.service';
import { Routine } from 'src/shared/types/Routine';
import { RoutineExercise } from 'src/shared/types/RoutineExercise';
import { ElementRef, ViewChild } from '@angular/core';
import { RoutineExerciseService } from 'src/shared/services/routine-exercise.service';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss']
})

export class EditRoutineComponent implements AfterViewInit {

  @ViewChild('modalContent', { read: ElementRef, static: true }) modalContent!: ElementRef;

  ngAfterViewInit(): void {
    this.modalContent.nativeElement.focus();
  }

  routine: Routine;
  expand: boolean[];
  isOpen: boolean = false;
  excerciseToDelete?: RoutineExercise;

  handleExpand(i: number) {
    this.expand[i] = !this.expand[i];
  }

  open(id: number | undefined) {
    this.isOpen = true;
    this.excerciseToDelete = this.routine.exercises.find(exercise => exercise.id === id);
    this.modalContent.nativeElement.focus();
  }

  close() {
    this.isOpen = false;
    this.excerciseToDelete = undefined;
  }

  delete() {
    console.log('Will delete ', this.excerciseToDelete);
    this.routineExerciseService.delete(this.routine.id, this.excerciseToDelete?.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService,
    private routineExerciseService: RoutineExerciseService
  ) {
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
