import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { SocketService } from './socket.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private _alertService: AlertService,
    private router: Router,
    private _errorService: ErrorService,
    private _socketService: SocketService
  ) { }

  public register(username: string, password: string): Promise<void> {
    const user = {
      username: username,
      password: password
    };
    return this.http.post<void>(`${environment.apiUrl}register`, user)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public login(username: string, password: string): Promise<void> {
    const user = {
      username: username,
      password: password
    };
    return this.http.post<void>(`${environment.apiUrl}authentication`, user)
      .toPromise()
      .then(res => {
        this.saveSession(res['session']);
      })
      .catch(err => this._errorService.handleError(err));
  }

  public logout(): void {
    this._socketService.disconnect();
    this.deleteSession()
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this._alertService.showAlert('You have been logged out!', 'alert alert-success', 3000);
      })
      .catch(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
  }

  private deleteSession(): Promise<void> {
    return this.http.delete<void>(environment.apiUrl + 'authentication')
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      return false;
    }

    const jwtHelper = new JwtHelper();

    try {
      jwtHelper.decodeToken(token);
      return jwtHelper.isTokenExpired(token) === false;
    } catch (e) {
      localStorage.clear();
      return false;
    }
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  public saveSession(token: string): void {
    localStorage.setItem('token', token);
  }

  public getUserInfo(): string {
    const token = this.getToken();
    try {
      if (!token) {
        return;
      }
      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.session.username;
    } catch (error) {
      return;
    }
  }
}
