import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';
import { DraftService } from '../draft.service';
import { ComposeService } from '../../compose/compose.service';
import { DraftMessage, Message } from '../../../../models/app-models';
import { MessageListResolverService } from '../../message-list-resolver.service';
import { take } from 'rxjs/operators';
import { OverlayService } from '../../../overlay/overlay.service';

@Component({
    selector: 'app-view-draft-message',
    templateUrl: './view-draft-message.component.html',
    styleUrls: ['./view-draft-message.component.scss']
})
export class ViewDraftMessageComponent implements OnInit {
    public message = <DraftMessage>{};
    public processing: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _draftService: DraftService,
        private router: Router,
        private _alertService: AlertService,
        private _composeService: ComposeService,
        private _messageListResolverService: MessageListResolverService,
        private _overlayService: OverlayService
    ) { }

    public deleteDraft(): void {
        const promise: Promise<void> = this._draftService.deleteDraft(this.message.message_id);
        this._overlayService.setBusyPromise(promise
            .then((res) => {
                this._messageListResolverService.draftCount.next(this._messageListResolverService.draftCount.getValue() - 1);
                this._alertService.showAlert('Draft successfully deleted!', 'alert alert-success', 3000);
                this.router.navigate(['/messaging/draft']);
            })
            .catch(() => {
                this.router.navigate(['/messaging/draft']);
            })
        );
    }

    public sendMessage(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        this.processing = true;
        const message = <Message>{
            message_recipient: recipient,
            message_subject: subject,
            message_body: body,
            message_id: this.message.message_id
        };
        const promise: Promise<void> = this._composeService.createNewMessage(message);
        this._overlayService.setBusyPromise(promise
            .then(results => {
                this.deleteDraft();
                this._alertService.showAlert('Message successfully sent!', 'alert alert-success', 3000);
                composeForm.reset();
            })
            .catch(() => {
                this.processing = false;
            })
        );
    }

    public updateDraft(recipient: string, subject: string, body: string, composeForm: NgForm): void {
        this.processing = true;
        const message = <Message>{
            message_recipient: recipient,
            message_subject: subject,
            message_body: body,
            message_id: this.message.message_id
        };
        const promise: Promise<void> = this._draftService.updateDraft(message);
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

    ngOnInit() {
        this.activatedRoute.data.pipe(take(1)).subscribe(data => {
            this.message = data.resolverData.message[0];
        });
    }

}
