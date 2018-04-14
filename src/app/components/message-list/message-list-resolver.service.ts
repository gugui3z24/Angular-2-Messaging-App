import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OverlayService } from '../overlay/overlay.service';
import { InboxService } from './inbox/inbox.service';
import { AlertService } from '../alert/alert.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageListResolverService implements Resolve<void> {

  public inboxCount = new BehaviorSubject<number>(0);
  public sentCount = new BehaviorSubject<number>(0);
  public draftCount = new BehaviorSubject<number>(0);

  constructor(
    private _overlayService: OverlayService,
    private _inboxService: InboxService,
    private _alertService: AlertService) { }

  resolve(): Promise<void> {
    const promise = this._overlayService.setBusyPromise(this._inboxService.countAllMessages()
      .then(results => {
        this.inboxCount.next(results['inbox']);
        this.sentCount.next(results['sent']);
        this.draftCount.next(results['draft']);
      })
      .catch(() => {
        this._alertService.showAlert('Unable to retrieve number of messages. Please notify an administrator', 'alert alert-danger', 3000);
      }));
    return promise;
  }

}
