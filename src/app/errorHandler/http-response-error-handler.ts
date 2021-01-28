import {HttpErrorResponse} from '@angular/common/http';

export interface HttpResponseErrorHandler {
  matches(error: HttpErrorResponse): boolean;
  handle(error: HttpErrorResponse);
}
