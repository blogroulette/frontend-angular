import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  settings: () => `/settings`
};

export interface SettingsContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class SettingsService {

  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<Settings> {
    return this.httpClient
      .cache()
      .get<Settings>(routes.settings());
  }

}

export interface Settings {
  value: string;
}
