import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DraftMessage, Message } from '../../../models/app-models';
import { ErrorService } from '../../../services/error.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DraftService {

  public draftMessages = new BehaviorSubject<DraftMessage[]>(null);

  constructor(
    private http: HttpClient,
    private _errorService: ErrorService
  ) { }

  public getDraft(id: string): Promise<DraftMessage> {
    return this.http.get<DraftMessage>(environment.apiUrl + 'draft/' + id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public saveDraft(message: Message): Promise<void> {
    return this.http.post<void>(environment.apiUrl + 'draft', message)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public updateDraft(message: Message): Promise<void> {
    return this.http.put<void>(environment.apiUrl + 'draft', message)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

  public getAllDrafts(): Promise<DraftMessage[]> {
    return this.http.get<DraftMessage[]>(environment.apiUrl + 'draft')
      .toPromise()
      .then(results => {
        this.draftMessages.next(results['messages'] as DraftMessage[]);
        return results as DraftMessage[];
      })
      .catch(err => this._errorService.handleError(err));
  }

  public deleteDraft(id: number): Promise<void> {
    return this.http.delete<void>(environment.apiUrl + 'draft/' + id)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

}
