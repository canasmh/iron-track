import { Component } from '@angular/core';
import {OverlayService} from "../../shared/services/overlay.service";

@Component({
  selector: 'app-edit-user-name',
  templateUrl: './edit-user-name.component.html',
  styleUrls: ['./edit-user-name.component.scss']
})
export class EditUserNameComponent {

  newUserName: string = '';
  constructor(private overlayService: OverlayService) {
  }

  closeOverlay() {
    this.overlayService.hideOverlay();
  }
}
