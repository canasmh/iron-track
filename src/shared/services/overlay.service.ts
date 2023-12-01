import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayVisible = new BehaviorSubject<boolean>(false);

  showOverlay() {
    this.overlayVisible.next(true);
  }

  hideOverlay() {
    this.overlayVisible.next(false);
  }

  getOverlayState(): Observable<boolean> {
    return this.overlayVisible.asObservable();
  }

}

