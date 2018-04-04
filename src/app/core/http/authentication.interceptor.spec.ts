import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { AuthenticationInterceptor } from './authentication.interceptor';

describe('AuthenticationInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
      }]
    });
  });

  beforeEach(inject([
    HttpClient,
    HttpTestingController
  ], (_http: HttpClient,
      _httpMock: HttpTestingController) => {

    http = _http;
    httpMock = _httpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should add authentication header field to the request url', () => {
    // Act
    http.get('/toto').authenticate().subscribe();

    // Assert
    // test for authenticatio header field
    httpMock.expectOne({ url: environment.serverUrl + '/toto'});
  });
});