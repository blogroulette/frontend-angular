import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  load_settings: () => {return ({
    endpoint: "/LoadSettings",
  });},
  save_settings: (c: save_settings_context) => {return ({
    endpoint: "/SaveSettings",
    body: {
      username: c.username,
      password: c.password,
      newpassword: c.newpassword,
    },
  });},
};

export interface save_settings_context {
  username: string,
  password: string,
  newpassword: string,
}

@Injectable()
export class SettingsService {

  constructor(private httpClient: HttpClient) { }

  loadSettings(): Observable<Settings> {
    return this.httpClient
      .authenticate()
      .post<Settings>(
        routes.load_settings().endpoint, {});
  }
  saveSettings(c: save_settings_context): Observable<Status> {
    return this.httpClient
      .authenticate()
      .post<Status>(
        routes.save_settings(c).endpoint,
        routes.save_settings(c).body);
  }

}

export interface Status {
  status: string;
  error?: string;
}
export interface Settings {
  username: string;
}
