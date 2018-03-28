import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  message: () => `/message`
};

export interface RouletteContext {
  // The quote's category: 'dev', 'explicit'...
  mid: string;
}

@Injectable()
export class RouletteService {

  constructor(private httpClient: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.httpClient
      .cache()
      .get<Message[]>(routes.message());
  }

}

export interface Message {
  values: string;
}
