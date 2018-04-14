import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Router, Resolve } from '@angular/router';
import { InboxService } from '../inbox.service';
import { Message } from '../../../../models/app-models';
import { OverlayService } from '../../../overlay/overlay.service';

@Injectable()
export class ViewMessageResolverService implements Resolve<Promise<Message>> {
    constructor(
        private router: Router,
        private _inboxService: InboxService,
        private overlayService: OverlayService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Message> {
        if (isNaN(route.params.id)) {
            this.router.navigate(['/messaging/inbox']);
            return;
        } else {
            const promise: Promise<Message> = this.overlayService.setBusyPromise(this._inboxService.getInboxMessage(route.params.id)
                .catch(() => {
                    this.router.navigate(['/messaging/inbox']);
                    return;
                }));
            return promise;
        }
    }
}




