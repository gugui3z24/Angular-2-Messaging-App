import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { InboxService } from '../inbox.service';
import { Message } from '../../../../models/app-models';
import { MessageListResolverService } from '../../message-list-resolver.service';
import { take } from 'rxjs/operators';
import { OverlayService } from '../../../overlay/overlay.service';

@Component({
    selector: 'app-view-message',
    templateUrl: './view-message.component.html',
    styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {

    public message = <Message>{};

    constructor(
        private activatedRoute: ActivatedRoute,
        private _inboxService: InboxService,
        private router: Router,
        private _alertService: AlertService,
        private _messageListResolverService: MessageListResolverService,
        private _overlayService: OverlayService
    ) { }

    public deleteMessage(): void {
        const promise: Promise<void> = this._inboxService.deleteMessage(this.message.message_id);
        this._overlayService.setBusyPromise(promise
            .then((res) => {
                this._messageListResolverService.inboxCount.next(this._messageListResolverService.inboxCount.getValue() - 1);
                this._alertService.showAlert('Message successfully deleted!', 'alert alert-success', 3000);
                this.router.navigate(['']);
            })
            .catch(() => {
                this.router.navigate(['']);
            })
        );
    }

    public changeReadStatus(): void {
        this.message.message_read = 'false';
        const promise: Promise<void> = this._inboxService.changeReadStatus(this.message);
        this._overlayService.setBusyPromise(promise
            .then(() => {
                this._alertService.showAlert('Message has been marked as unread', 'alert alert-success', 3000);
                this.router.navigate(['']);
            })
            .catch(() => {
                this.router.navigate(['']);
            })
        );
    }

    public reply(): void {
        this._inboxService.activeMessage = this.message;
        this.router.navigate(['/messaging/reply']);
    }

    ngOnInit() {
        this.activatedRoute.data.pipe(take(1)).subscribe(data => {
            this.message = data.resolverData.message[0];
            if (this.message.message_read === 'false') {
                this.message.message_read = 'true';
                this._inboxService.changeReadStatus(this.message);
            }
        });
    }

}
