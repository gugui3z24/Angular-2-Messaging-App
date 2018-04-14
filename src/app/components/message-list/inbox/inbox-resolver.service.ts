import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Message } from '../../../models/app-models';
import { InboxService } from './inbox.service';
import { OverlayService } from '../../overlay/overlay.service';

@Injectable()
export class InboxResolverService implements Resolve<Promise<Message[]>> {
  constructor(
    private _inboxService: InboxService,
    private _overlayService: OverlayService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Message[]> {
    const promise: Promise<Message[]> = this._overlayService.setBusyPromise(this._inboxService.getAllInboxMessages()
      .catch(() => {
        return;
      })
    );
    return promise;
  }

}
