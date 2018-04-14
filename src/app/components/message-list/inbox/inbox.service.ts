import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from '../../../models/app-models';
import { ErrorService } from '../../../services/error.service';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InboxService {

  public inboxMessages = new BehaviorSubject<Message[]>(null);
  public activeMessage: Message;
  public newMessageNotification = new Subject<void>();

  constructor(
    private http: HttpClient,
    private _errorService: ErrorService
  ) { }

  public getInboxMessage(id: string): Promise<Message> {
    return this.http.get<Message>(environment.apiUrl + 'message/' + id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public getAllInboxMessages(): Promise<Message[]> {
    return this.http.get<Message[]>(environment.apiUrl + 'message')
      .toPromise()
      .then(results => {
        this.inboxMessages.next(results['messages'] as Message[]);
        return results as Message[];
      })
      .catch(err => this._errorService.handleError(err));
  }

  public changeReadStatus(message: Message): Promise<void> {
    return this.http.put<void>(environment.apiUrl + 'message', message)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public deleteMessage(id: number): Promise<void> {
    return this.http.delete<void>(environment.apiUrl + 'message/' + id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public countAllMessages(): Promise<Array<number>> {
    return this.http.get(`${environment.apiUrl}user`)
      .toPromise()
      .then(res => {
        return <Array<number>>res['count'];
      })
      .catch(err => this._errorService.handleError(err));
  }

}

