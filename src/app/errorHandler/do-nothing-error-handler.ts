import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class DoNothingErrorHandler implements HttpResponseErrorHandler{
  constructor(
  ) {}

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 400){
      return true;
    }
  }

  handle(error: HttpErrorResponse) {
  }
}
