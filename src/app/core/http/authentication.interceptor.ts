import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../authentication/authentication.service';

/**
 * sets Bearer Token: JWT`.
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.authenticationService.credentials.token}`
    }
  });

  return next.handle(request);
}

}
