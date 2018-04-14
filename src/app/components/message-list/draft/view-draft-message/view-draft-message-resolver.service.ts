import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DraftService } from '../draft.service';
import { OverlayService } from '../../../overlay/overlay.service';
import { DraftMessage } from '../../../../models/app-models';

@Injectable()
export class ViewDraftMessageResolverService implements Resolve<Promise<DraftMessage>> {

    constructor(
        private router: Router,
        private _draftService: DraftService,
        private _overlayService: OverlayService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DraftMessage> {
        if (isNaN(route.params.id)) {
            this.router.navigate(['/messaging/draft']);
            return;
        } else {
            const promise: Promise<DraftMessage> = this._overlayService.setBusyPromise(this._draftService.getDraft(route.params.id)
                .catch(() => {
                    this.router.navigate(['/messaging/draft']);
                    return;
                }));
            return promise;
        }
    }
}








