import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { OverlayService } from '../overlay/overlay.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public processing: boolean;
    public username: string;
    public password: string;

    constructor(
        private _authenticationService: AuthenticationService,
        private _alertService: AlertService,
        private router: Router,
        private overlayService: OverlayService
    ) { }

    public register(username: string, password: string) {
        this.processing = true;
        const promise: Promise<void> = this._authenticationService.register(username, password);
        this.overlayService.setBusyPromise(promise
            .then(res => {
                this._alertService.showAlert('Successfully registered!', 'alert alert-success', 3000);
                this.router.navigate(['login']);
            })
            .catch(() => {
                this.processing = false;
            }));
    }

    ngOnInit() {
    }

}
