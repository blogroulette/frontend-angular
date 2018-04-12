import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { RouletteService } from './roulette.service';

describe('RouletteService', () => {
  const rouletteService: RouletteService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpCacheService,
        RouletteService
      ]
    });
  }));

  beforeEach(inject([
    HttpCacheService,
    RouletteService,
    HttpTestingController
  ], (htttpCacheService: HttpCacheService,
      _quoteService: RouletteService,
      _httpMock: HttpTestingController) => {

    quoteService = _quoteService;
    httpMock = _httpMock;

    htttpCacheService.cleanCache();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getMessages', () => {
    it('should return a random Messages', () => {
      // Arrange
      const mockRoulette = { value: 'Message' };

      // Act
      const randomRouletteSubscription = ouletteService.getRandomRoulette({ category: 'toto' });

      // Assert
      randomRouletteSubscription.subscribe((quote: string) => {
        expect(quote).toEqual(mockRoulette.value);
      });
      httpMock.expectOne({}).flush(mockQuote);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomRouletteSubscription = rouletteService.getRandomRoulette({ category: 'toto' });

      // Assert
      randomRouletteSubscription.subscribe((roulette: string) => {
        expect(typeof roulette).toEqual('string');
        expect(roulette).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });
  });
});
