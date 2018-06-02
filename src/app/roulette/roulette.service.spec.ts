import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {
  CoreModule,
  HttpCacheService,
  AuthenticationInterceptor,
  AuthenticationService,
  MockAuthenticationService
} from '@app/core';
import { RouletteService, Message } from './roulette.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('RouletteService', () => {
  let rouletteService: RouletteService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpCacheService,
        RouletteService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptor,
          multi: true
        },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    });
  }));

  beforeEach(inject([
    HttpCacheService,
    RouletteService,
    HttpTestingController
  ], (htttpCacheService: HttpCacheService,
    _rouletteService: RouletteService,
    _httpMock: HttpTestingController) => {

      rouletteService = _rouletteService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getMessages', () => {
    it('should return a random Message', () => {
      // Arrange
      const mockRoulette: Message = {
        messageid: 'asdf1234',
        title: 'title',
        text: 'text',
        timestamp: '152000000',
        votes: 12
      };

      // Act
      const randomRouletteSubscription = rouletteService.getRandomMessage();

      // Assert
      randomRouletteSubscription.subscribe((message: Message) => {
        expect(message.messageid).toEqual(mockRoulette.messageid);
      });
      httpMock.expectOne({}).flush(mockRoulette);
    });

    /*
    it('should return a string in case of error', () => {
      // Act
      const randomRouletteSubscription = rouletteService.getRandomMessage();

      // Assert
      randomRouletteSubscription.subscribe((message: Message) => {
        expect(typeof message).toEqual('Message');
        expect(message).toContain('error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });*/
  });
});
