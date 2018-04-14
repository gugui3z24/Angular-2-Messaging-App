import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentService } from './sent.service';
import { SentMessage } from '../../../models/app-models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  public sentMessages = new Array<SentMessage>();

  constructor(
    private _sentService: SentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public viewMessage(message: any): void {
    this.router.navigate(['/messaging/sent/' + message.sent_id]);
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe(data => {
      this.sentMessages = data.resolverData.messages;
    });
  }

}
