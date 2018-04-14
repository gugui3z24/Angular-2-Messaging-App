import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { OverlayService } from '../overlay/overlay.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public processing: boolean;
    public username: string;
    public password: string;
    private socket: any;

    constructor(
        private _authenticationService: AuthenticationService,
        private _alertService: AlertService,
        private router: Router,
        private overlayService: OverlayService
    ) { }

    login(username: string, password: string): void {
        this.processing = true;
        this.overlayService.setBusyPromise(
            this._authenticationService.login(username, password)
                .then(res => {
                    this._alertService.showAlert('Welcome ' + username.toLowerCase() + '!', 'alert alert-success', 3000);
                    this.router.navigate(['']);
                })
                .catch(() => {
                    this.processing = false;
                }));
    }

    ngOnInit() {
    }

}
