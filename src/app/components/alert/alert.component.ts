import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AlertService, AlertDetails } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public alertDetails: AlertDetails;

  constructor(private _alertService: AlertService) { }

  ngOnInit() {
    this._alertService.alertDetails.subscribe(details => {
      this.alertDetails = details;
    });
  }

}
