import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {AuthErrorHandler} from './auth-error-handler';
import {InternalServerErrorHandler} from './internal-server-error-handler';
import {ValidationErrorHandler} from './validation-error-handler';
import {NotFoundErrorHandler} from './not-found-error-handler';

@Injectable()
export class DefaultErrorHandler implements HttpResponseErrorHandler{

  private readonly handlers: HttpResponseErrorHandler[];

  constructor(
    private authErrorHandler: AuthErrorHandler,
    private internalServerErrorHandler: InternalServerErrorHandler,
    private validationErrorHandler: ValidationErrorHandler,
    private notFoundErrorHandler: NotFoundErrorHandler
  ){
    this.handlers = [
      authErrorHandler,
      internalServerErrorHandler,
      validationErrorHandler,
      notFoundErrorHandler
    ];
  }

  handle(error: HttpErrorResponse){
    for(const handler of this.handlers){
      if(handler.matches(error)){
        handler.handle(error);
      }
    }
  }

  matches(error: HttpErrorResponse): boolean {
    return true;
  }
}
