import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SentService } from '../sent.service';
import { SentMessage } from '../../../../models/app-models';
import { OverlayService } from '../../../overlay/overlay.service';

@Injectable()
export class ViewSentMessageResolverService implements Resolve<Promise<SentMessage>> {

    constructor(
        private router: Router,
        private _sentService: SentService,
        private _overlayService: OverlayService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SentMessage> {
        if (isNaN(route.params.id)) {
            this.router.navigate(['/messaging/sent']);
            return;
        } else {
            const promise: Promise<SentMessage> = this._overlayService.setBusyPromise(this._sentService.getSentMessage(route.params.id)
                .catch(() => {
                    this.router.navigate(['/messaging/sent']);
                    return;
                }));
            return promise;
        }
    }


}
