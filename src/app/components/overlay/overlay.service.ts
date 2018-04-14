import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OverlayService {

  public showOverlay = new Subject<boolean>();

  constructor() { }

  public setOverlay(): void {
    this.showOverlay.next(true);
  }

  public clearOverlay(): void {
    this.showOverlay.next();
  }

  public setBusyPromise(promise: Promise<any>): Promise<any> {
    this.setOverlay();
    promise
      .then(() => {
        this.clearOverlay();
      })
      .catch(() => {
        this.clearOverlay();
      });
    return promise;
  }

}
