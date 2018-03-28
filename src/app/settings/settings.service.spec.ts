import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { SettingsService } from './settings.service';

describe('QuoteService', () => {
  let settingsService: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpCacheService,
        SettingsService
      ]
    });
  }));

  beforeEach(inject([
    HttpCacheService,
    SettingsService,
    HttpTestingController
  ], (htttpCacheService: HttpCacheService,
      _settingsService: SettingsService,
      _httpMock: HttpTestingController) => {

    settingsService = _settingsService;
    httpMock = _httpMock;

    htttpCacheService.cleanCache();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSettings', () => {
    it('should return Settings', () => {
      // Arrange
      const mockSettings = { value: 'Settings' };

      // Act
      const randomSettingsSubscription = settingsService.getRandomSettings({ category: 'toto' });

      // Assert
      randomSettingsSubscription.subscribe((settings: string) => {
        expect(settings).toEqual(mockSettings.value);
      });
      httpMock.expectOne({}).flush(mockSettings);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomSettingsSubscription = SettingsService.getRandomSettings({ category: 'toto' });

      // Assert
      randomSettingsSubscription.subscribe((settings: string) => {
        expect(typeof settings).toEqual('string');
        expect(settings).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });
  });
});
