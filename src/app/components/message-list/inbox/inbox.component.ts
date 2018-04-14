import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InboxService } from './inbox.service';
import { Message, SentMessage, DraftMessage } from '../../../models/app-models';
import { AlertService } from '../../alert/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, OnDestroy {

  public messages = new Array<Message>();
  private destroy = new Subject<void>();

  constructor(
    private _inboxService: InboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _alertService: AlertService
  ) { }

  public viewMessage(message: Message): void {
    this.router.navigate([`/messaging/inbox/${message.message_id}`]);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this._inboxService.newMessageNotification.pipe(takeUntil(this.destroy)).subscribe(() => {
      this._inboxService.getAllInboxMessages()
        .then((data) => {
          this.messages = data['messages'];
        })
        .catch(() => {
          this._alertService.showAlert('Unable to retreive new messages', 'alert alert-danger', 3000);
        });
    });
    this.activatedRoute.data.pipe(take(1)).subscribe(data => {
      if (data.resolverData) {
        this.messages = data.resolverData.messages;
      }
    });
  }

}
