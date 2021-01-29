import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {LoginErrorHandler} from '../errorHandler/login-error-handler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService,
              private loginErrorHandler: LoginErrorHandler) {}

  public login(loginData): Observable<any>{
    return this.apiService.postLogin('/login', loginData, this.loginErrorHandler);
  }
}
