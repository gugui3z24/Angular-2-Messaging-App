import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

export class AlertDetails {
  public alertMessage: string;
  public alertClass: string;
}

@Injectable()
export class AlertService {
  public alertDetails = new Subject<AlertDetails>();
  public timeOutInterval: any;

  constructor() { }

  public showAlert(alertMessage: string, className: string, timeOut: number): void {
    const alertDetails = new AlertDetails();
    alertDetails.alertClass = className;
    alertDetails.alertMessage = alertMessage;
    this.alertDetails.next(alertDetails);
    setTimeout(() => {
      this.alertDetails.next();
    }, timeOut);
  }

}
