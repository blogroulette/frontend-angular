import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  get_message: () => {return ({
    endpoint: "GetMessage",
  });},
  get_documentation: () => {return ({
    endpoint: "GetMessage",
    body: {
      messageid: 0,
    }
  });},
  add_message: (c: add_message_context) => {return ({
    endpoint: "AddMessage",
    body: {
      title: c.title,
      text: c.text,
    },
  });},
  upvote_message: (c: vote_context) => {return ({
    endpoint: "UpvoteMessage",
    body: {
      messageid: c.id,
    },
  });},
  downvote_message: (c: vote_context) => {return ({
    endpoint: "DownvoteMessage",
    body: {
      messageid: c.id,
    },
  });},
  add_comment: (c: add_comment_context) => {return ({
    endpoint: "AddComment",
    body: {
      messageid: c.messageid,
      text: c.text,
    },
  });},
  upvote_comment: (c: vote_context) => {return ({
    endpoint: "UpvoteComment",
    body: {
      commentid: c.id,
    },
  });},
  downvote_comment: (c: vote_context) => {return ({
    endpoint: "DownvoteComment",
    body: {
      commentid: c.id,
    },
  });},
};

export interface add_message_context {
  title: string,
  text: string,
}
export interface vote_context {
  id: string,
}
export interface add_comment_context {
  messageid: string,
  text: string,
}

@Injectable()
export class RouletteService {

  constructor(private httpClient: HttpClient) { }

  getRandomMessage(): Observable<Message> {
    return this.httpClient
      .post<Message>(
        routes.get_message().endpoint, {});
  }
  getDocumentation(): Observable<Message> {
    return this.httpClient
      .cache()
      .post<Message>(
        routes.get_documentation().endpoint,
        routes.get_documentation().body);
  }
  addMessage(c: add_message_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.add_message(c).endpoint,
        routes.add_message(c).body)
        .authenticate();
  }
  upvoteMessage(c: vote_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.upvote_message(c).endpoint,
        routes.upvote_message(c).body)
        .authenticate();
  }
  downvoteMessage(c: vote_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.downvote_message(c).endpoint,
        routes.downvote_message(c).body)
        .authenticate();
  }
  addComment(c: add_comment_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.add_comment(c).endpoint,
        routes.add_comment(c).body)
        .authenticate();
  }
  upvoteComment(c: vote_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.upvote_comment(c).endpoint,
        routes.upvote_comment(c).body)
        .authenticate();
  }
  downvoteComment(c: vote_context): Observable<Status> {
    return this.httpClient
      .post<Status>(
        routes.downvote_comment(c).endpoint,
        routes.downvote_comment(c).body)
        .authenticate();
  }
}

export interface Status {
  status: string;
  error?: string;
}
export interface Message {
  messageid: string;
  timestamp: string;
  title: string;
  text: string;
  votes: number;
  comments?: Comment[];
}
export interface Comment {
  commentid: string,
  timestamp: string,
  text: string,
  votes: number,
}
