import {
  HttpInterceptor, HttpEvent, HttpHandler, HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor{
  constructor(private authenticationService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authenticationService.isLoggedIn()){
      const authHeader = request.clone({
        setHeaders: {Authorization:   this.authenticationService.getToken()}
      });
      return next.handle(authHeader);
    }
    return next.handle(request);
  }
}
