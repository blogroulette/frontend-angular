import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService, Credentials } from '@app/core';

const routes = {
  load_settings: () => {
    return ({
      endpoint: '/LoadSettings',
    });
  },
  save_settings: (c: SaveSettingsContext) => {
    return ({
      endpoint: '/SaveSettings',
      body: {
        username: c.username,
        password: c.password,
        newpassword: c.newpassword,
      },
    });
  },
};

export interface SaveSettingsContext {
  username: string;
  password: string;
  newpassword: string;
}

@Injectable()
export class SettingsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  loadSettings(): Observable<Settings> {
    return this.httpClient
      .authenticate()
      .post<Settings>(
        routes.load_settings().endpoint, {});
  }
  saveSettings(c: SaveSettingsContext): Observable<Status> {
    const obs = this.httpClient
      .authenticate()
      .post<Status>(
        routes.save_settings(c).endpoint,
        routes.save_settings(c).body);
    obs.subscribe((credentials: Credentials) => {
      this.authenticationService.Syslogin(credentials);
    });
    return obs;
  }

}

export interface Status {
  status: string;
  error?: string;
  username: string;
  token: string;
}
export interface Settings {
  username: string;
}
