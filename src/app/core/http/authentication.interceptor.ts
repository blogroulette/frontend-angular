import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '@env/environment';

import { AuthenticationService } from '../authentication/authentication.service';

/**
 * sets headers`.
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService){}
  get token(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.token : null;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Authorization', this.token )
    });
    return next.handle(request);
  }

}
