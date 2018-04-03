import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  message: () => `/message`,
  doc: () => `/message/0`,
  new_message: () => `new_message`,
  add_comment: () => `add_comment`,
  upvote: () => `upvote`,
  downvote: () => `downvote`,
};

export interface RouletteContext {
  // The quote's category: 'dev', 'explicit'...
  mid: string;
}

@Injectable()
export class RouletteService {

  constructor(private httpClient: HttpClient) { }
/*
  getMessages(): Observable<Message[]> {
    return this.httpClient
      .cache()
      .get<Message[]>(routes.message());
  }
*/
  getMessage(): Observable<Message> {
    return of(MOCKMESSAGE);
  }
  getDoc(): Observable<Message> {
    return of(MOCKMESSAGE);
  }
/*
  }
  addComment(){

  }
  upvote(){

  }
  downvote(){

  }*/

}

export const MOCKMESSAGE: Message = {
  mid: "message-id",
  title: "Documentation-title",
  text: "Documentation text. This is written in markdown\n```test```",
  votes: 17,
  comments: [
    {
      cid: "comment-id",
      text: "Comment Text",
      votes: 123,
    },
  ],
}

export interface Message {
  mid: string;
  title: string;
  text: string;
  votes: number;
  comments?: Comment[];
}
export interface Comment {
  cid: string;
  text: string;
  votes: number;
}
