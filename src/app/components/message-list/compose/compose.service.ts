import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorService } from '../../../services/error.service';
import { environment } from '../../../../environments/environment';
import { User, Message } from '../../../models/app-models';

@Injectable()
export class ComposeService {

  constructor(
    private http: HttpClient,
    private _errorService: ErrorService
  ) { }

  public createNewMessage(message: Message): Promise<void> {
    return this.http.post<void>(environment.apiUrl + 'message', message)
      .toPromise()
      .catch(err => this._errorService.handleError(err));
  }

}
