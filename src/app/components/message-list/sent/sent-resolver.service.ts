import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SentMessage } from '../../../models/app-models';
import { SentService } from './sent.service';
import { OverlayService } from '../../overlay/overlay.service';

@Injectable()
export class SentResolverService implements Resolve<Promise<SentMessage[]>> {
  constructor(
    private _sentService: SentService,
    private _overlayService: OverlayService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SentMessage[]> {
    const promise: Promise<SentMessage[]> = this._overlayService.setBusyPromise(this._sentService.getAllSentMessages()
      .catch(() => {
        this.router.navigate(['']);
        return;
      }));
    return promise;
  }

}
