import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { SentService } from '../sent.service';
import { SentMessage } from '../../../../models/app-models';
import { MessageListResolverService } from '../../message-list-resolver.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-view-sent-message',
    templateUrl: './view-sent-message.component.html',
    styleUrls: ['./view-sent-message.component.scss']
})
export class ViewSentMessageComponent implements OnInit {

    public message = <SentMessage>{};

    constructor(
        private activatedRoute: ActivatedRoute,
        private _sentService: SentService,
        private _alertService: AlertService,
        private router: Router,
        private _messageListResolverService: MessageListResolverService
    ) { }

    public deleteMessage(): void {
        this._sentService.deleteMessage(this.message)
            .then((res) => {
                this._messageListResolverService.sentCount.next(this._messageListResolverService.sentCount.getValue() - 1);
                this._sentService.getAllSentMessages();
                this._alertService.showAlert('Message successfully deleted!', 'alert alert-success', 3000);
                this.router.navigate(['/messaging/sent']);
            })
            .catch(() => {
                this.router.navigate(['/messaging/sent']);
            });
    }

    ngOnInit() {
        this.activatedRoute.data.pipe(take(1)).subscribe(data => {
            this.message = data.resolverData.message[0];
        });
    }

}
