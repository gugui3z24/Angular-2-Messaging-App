import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import 'rxjs/add/operator/take';
import { AlertService } from '../alert/alert.service';
import { SentService } from './sent/sent.service';
import { Message, SentMessage, DraftMessage } from '../../models/app-models';
import { InboxService } from './inbox/inbox.service';
import { InboxComponent } from './inbox/inbox.component';
import { Subject } from 'rxjs/Subject';
import { MessageListResolverService } from './message-list-resolver.service';

import { takeUntil } from 'rxjs/operators';
import { routerTransition } from '../../app-animations';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  animations: [routerTransition]
})
export class MessageListComponent implements OnInit, OnDestroy {
  private socket: any;
  private destroy = new Subject<void>();

  constructor(
    private _alertService: AlertService,
    private _authenticationService: AuthenticationService,
    private _sentService: SentService,
    private activatedRoute: ActivatedRoute,
    private _socketService: SocketService,
    private inboxService: InboxService,
    private _messageListResolverService: MessageListResolverService
  ) { }

  getState(outlet: RouterOutlet): string {
    return outlet.activatedRouteData['title'];
  }

  ngOnInit() {
    const username = this._authenticationService.getUserInfo();
    this._socketService.connect(username).pipe(takeUntil(this.destroy)).subscribe(() => {
      this._messageListResolverService.inboxCount.next(this._messageListResolverService.inboxCount.getValue() + 1);
      this.inboxService.newMessageNotification.next();
      setTimeout(() => {
        this._alertService.alertDetails.next();
        this._alertService.showAlert('You have a new message!', 'alert alert-success', 3000);
      }, 2000);
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
