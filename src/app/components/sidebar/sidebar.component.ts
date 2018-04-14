import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SentService } from '../message-list/sent/sent.service';
import { InboxService } from '../message-list/inbox/inbox.service';
import { DraftService } from '../message-list/draft/draft.service';
import { MessageListResolverService } from '../message-list/message-list-resolver.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public sent = new BehaviorSubject<number>(0);
    public inbox = new BehaviorSubject<number>(0);
    public draft = new BehaviorSubject<number>(0);

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private _messageListResolverService: MessageListResolverService
    ) { }

    public changeRoute(route: string): void {
        this.router.navigate(['messaging/' + route]);
    }

    ngOnInit() {
        this.sent = this._messageListResolverService.sentCount;
        this.inbox = this._messageListResolverService.inboxCount;
        this.draft = this._messageListResolverService.draftCount;
    }

}
