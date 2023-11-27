import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoutineExercise } from '../../shared/types/RoutineExercise';
import { OverlayService } from '../../shared/services/overlay.service';
import {Exercise} from "../../shared/types/Exercise";

@Component({
  selector: 'app-exercise-pop-up',
  templateUrl: './exercise-pop-up.component.html',
  styleUrls: ['./exercise-pop-up.component.scss']
})

export class ExercisePopUpComponent {
  @Input() arrayOfRoutineExercises!: RoutineExercise[];
  constructor(private overlayService: OverlayService) {
  }

  closeOverlay() {
    this.overlayService.hideOverlay();
  }

}

