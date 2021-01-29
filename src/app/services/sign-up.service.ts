import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {SignUpErrorHandler} from '../errorHandler/sign-up-error-handler';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private apiService: ApiService,
              private signUpErrorHandler: SignUpErrorHandler) { }

  public signUp(signUpData): Observable<any>{
    return this.apiService.postSingle('/signUp', signUpData, this.signUpErrorHandler);
  }
}
