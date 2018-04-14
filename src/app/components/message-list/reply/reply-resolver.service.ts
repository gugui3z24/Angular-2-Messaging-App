import { ViewMessageComponent } from './../inbox/view-message/view-message.component';
import { Injectable, ViewChild } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { InboxService } from '../inbox/inbox.service';
import { Message } from '../../../models/app-models';
import { OverlayService } from '../../overlay/overlay.service';

@Injectable()
export class ReplyResolverService implements Resolve<Message> {
    constructor(
        private _inboxService: InboxService,
        private router: Router,
        private _overlayService: OverlayService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Message {
        const message: Message = this._inboxService.activeMessage;
        if (!message) {
            this.router.navigate(['']);
            return;
        }
        return message;
    }

}


