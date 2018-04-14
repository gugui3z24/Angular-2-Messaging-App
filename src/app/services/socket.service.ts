import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class SocketService {

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private _errorService: ErrorService) { }

  public connect(username: string): Observable<any> {
    this.socket.connect();
    this.socket.emit('saveSession', username);
    return this.socket.fromEvent('message');
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public getId(): Promise<any> {
    return this.socket.fromEventOnce('getId');
  }

}
