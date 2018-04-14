import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { ComposeService } from './compose.service';
import { SentService } from '../sent/sent.service';
import { DraftService } from '../draft/draft.service';
import { MessageListResolverService } from '../message-list-resolver.service';
import { OverlayService } from '../../overlay/overlay.service';
import { Message } from '../../../models/app-models';

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

    public processing: boolean;
    public messageRecipient: string;
    public messageSubject: string;
    public messageBody: string;

    constructor(
        private _composeService: ComposeService,
        private _alertService: AlertService,
        private router: Router,
        private _sentService: SentService,
        private _draftService: DraftService,
        private activatedRoute: ActivatedRoute,
        private _messageListResolverService: MessageListResolverService,
        private _overlayService: OverlayService
    ) { }

    public sendMessage(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        this.processing = true;
        const message = <Message>{
            message_recipient: recipient,
            message_subject: subject,
            message_body: body
        };
        const promise = this._composeService.createNewMessage(message);
        this._overlayService.setBusyPromise(promise
            .then(results => {
                this._messageListResolverService.sentCount.next(this._messageListResolverService.sentCount.getValue() + 1);
                this._alertService.showAlert('Message successfully sent!', 'alert alert-success', 3000);
                this.router.navigate(['/messaging/inbox']);
            })
            .catch(() => {
                this.processing = false;
            })
        );
    }

    public saveDraft(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        this.processing = true;
        const message = <Message>{
            message_recipient: recipient,
            message_subject: subject,
            message_body: body
        };
        const promise: Promise<void> = this._draftService.saveDraft(message);
        this._overlayService.setBusyPromise(promise
            .then(() => {
                this._messageListResolverService.draftCount.next(this._messageListResolverService.draftCount.getValue() + 1);
                this._alertService.showAlert('Draft successfully saved', 'alert alert-success', 3000);
                this.router.navigate(['/messaging/draft']);
                setTimeout(() => {
                    composeForm.reset();
                }, 2000);
            })
            .catch(() => {
                this.processing = false;
            })
        );
    }

    ngOnInit() {
    }

}
