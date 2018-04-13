import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { SettingsService, Settings } from './settings.service';

describe('SettingsService', () => {
  let settingsService: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
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

  describe('loadSettingss', () => {
    it('should return Settings', () => {
      // Arrange
      const mockSettings: Settings = {
        username: 'Mustermann'
      };

      // Act
      const randomSettingsSubscription = settingsService.loadSettings();

      // Assert
      randomSettingsSubscription.subscribe((settings: Settings) => {
        expect(settings.username).toEqual(mockSettings.username);
      });
      httpMock.expectOne({}).flush(mockSettings);
    });

    /*
    it('should return a string in case of error', () => {
      // Act
      const randomSettingsSubscription = settingsService.loadSettings();

      // Assert
      randomSettingsSubscription.subscribe((settings: Settings) => {
        expect(typeof settings).toEqual('Settings');
        expect(settings).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });*/
  });
});
