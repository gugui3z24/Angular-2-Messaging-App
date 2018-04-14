import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SentMessage } from '../../../models/app-models';
import { ErrorService } from '../../../services/error.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SentService {

  public sentMessages = new BehaviorSubject<SentMessage[]>(null);

  constructor(
    private http: HttpClient,
    private _errorService: ErrorService
  ) { }

  public getSentMessage(id: string): Promise<SentMessage> {
    return this.http.get<SentMessage>(environment.apiUrl + 'sent/' + id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public getAllSentMessages(): Promise<SentMessage[]> {
    return this.http.get<SentMessage[]>(environment.apiUrl + 'sent')
      .toPromise()
      .then(results => {
        this.sentMessages.next(results['messages'] as SentMessage[]);
        return results as SentMessage[];
      })
      .catch(err => this._errorService.handleError(err));
  }

  public deleteMessage(message: any): Promise<any> {
    return this.http.delete(environment.apiUrl + 'sent/' + message.sent_id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

}
