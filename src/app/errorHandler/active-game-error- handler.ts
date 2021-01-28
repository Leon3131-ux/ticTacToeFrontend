import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ActiveGameErrorHandler implements HttpResponseErrorHandler{
  constructor(
    private router: Router
  ) {}

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 400){
      return true;
    }
  }

  handle(error: HttpErrorResponse) {
    this.router.navigate(['/home']);
  }
}
