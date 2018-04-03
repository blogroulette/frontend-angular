import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '@env/environment';

import { AuthenticationService } from '../authentication/authentication.service';

/**
 * sets headers`.
 */
@Injectable()
export class ApiHeaderInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Authorization', 'Token')
    });
    return next.handle(request);
  }

}
