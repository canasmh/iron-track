import { Component, Input } from '@angular/core';
import { RoutineExercise } from '../../shared/types/RoutineExercise';
import { OverlayService } from '../../shared/services/overlay.service';

@Component({
  selector: 'app-exercise-pop-up',
  templateUrl: './exercise-pop-up.component.html',
  styleUrls: ['./exercise-pop-up.component.scss']
})

export class ExercisePopUpComponent {
//q:how do I get the routineExercises from the add-routine component?
  @Input() arrayOfRoutineExercises!: RoutineExercise[];
  constructor(private overlayService: OverlayService) {
  }

  closeOverlay() {
    this.overlayService.hideOverlay();
  }

}

