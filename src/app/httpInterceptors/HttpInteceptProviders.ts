import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthHeaderInterceptor} from "./authHeaderInterceptor";

export const httpInterceptProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true}
];
