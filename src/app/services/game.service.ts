import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../classes/game';
import {ApiService} from './api.service';
import {HttpResponseErrorHandler} from '../errorHandler/http-response-error-handler';
import {DefaultErrorHandler} from '../errorHandler/default-error-handler';
import {ValidationErrorHandler} from '../errorHandler/validation-error-handler';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: ApiService,
              private defaultErrorHandler: DefaultErrorHandler,
              private validationErrorHandler: ValidationErrorHandler) { }

  public joinGame(inviteCode: string): Observable<Game>{
    return this.apiService.postSingle('/joinGame/' + inviteCode);
  }

  public createGame(): Observable<Game>{
    return this.apiService.getSingle('/createGame');
  }

  public getActiveGame(errorHandler: HttpResponseErrorHandler = this.defaultErrorHandler): Observable<Game>{
    return this.apiService.getSingle('/activeGame', errorHandler);
  }

  public leaveGame(): Observable<any>{
    return this.apiService.getSingle('/leaveGame');
  }

  public startGame(): Observable<any>{
    return this.apiService.getSingle('/startGame');
  }

  public makeMove(x: number, y: number): Observable<any>{
    return this.apiService.postSingle('/saveMove', {x: x, y: y}, this.validationErrorHandler);
  }
}
