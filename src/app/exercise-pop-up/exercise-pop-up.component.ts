import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoutineExercise } from '../../shared/types/RoutineExercise';
import { OverlayService } from '../../shared/services/overlay.service';

@Component({
  selector: 'app-exercise-pop-up',
  templateUrl: './exercise-pop-up.component.html',
  styleUrls: ['./exercise-pop-up.component.scss']
})

export class ExercisePopUpComponent implements OnChanges {
//q:how do I get the routineExercises from the add-routine component?
  @Input() routineExercises!: RoutineExercise[];
  @Input() weightUnit!: string;
  @Input() quantityUnit!: string;
  @Input() exercise!: string;
  @Input() sets!: number;
  @Input() quantity!: number;
  @Input() weight!: string;
  @Input() nExercises!: number;
  @Input() reps!: boolean;

  constructor(private overlayService: OverlayService) {
  }

  closeOverlay() {
    this.overlayService.hideOverlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}

