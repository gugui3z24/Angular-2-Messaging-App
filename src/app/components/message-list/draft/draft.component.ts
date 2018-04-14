import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DraftMessage } from '../../../models/app-models';
import { DraftService } from './draft.service';

import { take } from 'rxjs/operators';

@Component({
    selector: 'app-draft',
    templateUrl: './draft.component.html',
    styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {

    public draftMessages = new Array<DraftMessage>();

    constructor(
        private _draftService: DraftService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public viewMessage(message: any): void {
        this.router.navigate(['/messaging/draft/', message.message_id]);
    }

    ngOnInit() {
        this.activatedRoute.data.pipe(take(1)).subscribe(data => {
            this.draftMessages = data.resolverData.messages;
        });
    }

}
