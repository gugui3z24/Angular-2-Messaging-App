import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { OverlayService } from '../components/overlay/overlay.service';

@Injectable()
export class ErrorService {

  constructor(
    private _alertService: AlertService,
    private router: Router,
    private _overlayService: OverlayService
  ) { }

  public handleError(error: any): Promise<never> {
    this._overlayService.clearOverlay();
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    if (!error.error) {
      this._alertService.showAlert('Unable to process your request. Please try again.', 'alert alert-danger', 3000);
    } else {
      this._alertService.showAlert(error.error.message, 'alert alert-danger', 3000);
    }
    return Promise.reject(error);
  }

}

