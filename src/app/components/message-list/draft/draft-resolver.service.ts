import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DraftService } from './draft.service';
import { DraftMessage } from '../../../models/app-models';
import { OverlayService } from '../../overlay/overlay.service';

@Injectable()
export class DraftResolverService implements Resolve<Promise<DraftMessage[]>> {

  constructor(
    private _draftService: DraftService,
    private _overlayService: OverlayService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DraftMessage[]> {
    const promise: Promise<DraftMessage[]> = this._overlayService.setBusyPromise(this._draftService.getAllDrafts()
      .catch(() => {
        this.router.navigate(['']);
        return;
      })
    );
    return promise;
  }
}



