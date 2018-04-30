import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';

export interface Credentials {
  username: string;
  token: string;
}

export interface Response {
  username?: string;
  token?: string;
  status?: string;
  error?: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
export interface RegisterContext {
  username: string;
  password: string;
}

export interface Status {
  status: string;
  error?: string;
}

const routes = {
  login: (c: LoginContext) => {
    return ({
      endpoint: '/Login',
      body: {
        username: c.username,
        password: c.password,
      },
    });
  },
  register: (c: RegisterContext) => {
    return ({
      endpoint: '/Register',
      body: {
        username: c.username,
        password: c.password,
      },
    });
  },
  logout: () => {
    return ({
      endpoint: '/Logout',
    });
  },
};

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(private httpClient: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Response>} The user credentials.
   */
  login(c: LoginContext): Observable<Response> {
    const obs = this.httpClient
      .post<Response>(
        routes.login(c).endpoint,
        routes.login(c).body);
    obs.subscribe((credentials: Credentials) => {
      this.setCredentials(credentials, c.remember);
    });
    return obs;
  }

  /**
   * Registers the user.
   * @param {RegisterContext} context The register parameters.
   * @return {Observable<Response>} The user credentials.
   */
  register(c: RegisterContext): Observable<Response> {
    const obs = this.httpClient
      .post<Response>(
        routes.register(c).endpoint,
        routes.register(c).body);
    obs.subscribe((credentials: Credentials) => {
      this.setCredentials(credentials, false);
    });
    return obs;
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<Status>} True if the user was logged out successfully.
   */
  logout(): Observable<Status> {
    const obs = this.httpClient
      .authenticate()
      .post<Status>(
        routes.logout().endpoint, {});
    obs.subscribe(() => {
      this.setCredentials();
    });
    return obs;
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
