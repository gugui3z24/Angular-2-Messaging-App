import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { InboxService } from '../inbox/inbox.service';
import { ComposeService } from '../compose/compose.service';
import { DraftService } from '../draft/draft.service';
import { Message } from '../../../models/app-models';
import { take } from 'rxjs/operators';
import { OverlayService } from '../../overlay/overlay.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

    public message = <Message>{};
    public validRecipient = true;
    public processing: boolean;

    constructor(
        private _inboxService: InboxService,
        private _composeService: ComposeService,
        private _alertService: AlertService,
        private router: Router,
        private _draftService: DraftService,
        private activatedRoute: ActivatedRoute,
        private _overlayService: OverlayService
    ) { }

    public sendMessage(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        if (this.validRecipient) {
            this.processing = true;
            const message = <Message>{
                message_recipient: recipient,
                message_subject: subject,
                message_body: body
            };
            const promise: Promise<void> = this._composeService.createNewMessage(message);
            this._overlayService.setBusyPromise(promise
                .then(results => {
                    this._alertService.showAlert('Message successfully sent!', 'alert alert-success', 3000);
                    this.router.navigate(['/messaging/read/' + this.message.message_id]);
                    composeForm.reset();
                })
                .catch(() => {
                    this.processing = false;
                })
            );
        }
    }

    public saveDraft(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        if (this.validRecipient) {
            this.processing = true;
            const message = <Message>{
                message_recipient: recipient,
                message_subject: subject,
                message_body: body
            };
            const promise: Promise<void> = this._draftService.saveDraft(message);
            this._overlayService.setBusyPromise(promise
                .then(() => {
                    this._alertService.showAlert('Draft successfully saved', 'alert alert-success', 3000);
                    this.router.navigate(['/messaging/draft']);
                    composeForm.reset();
                })
                .catch(() => {
                    this.processing = false;
                })
            );
        }
    }

    ngOnInit() {
        this.activatedRoute.data.pipe(take(1)).subscribe(data => {
            this.message = data.resolverData;
        });
    }

}
