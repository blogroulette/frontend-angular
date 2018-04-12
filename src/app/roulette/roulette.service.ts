import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

const routes = {
  get_message: () => {return ({
    endpoint: '/GetMessage',
  }); },
  get_documentation: () => {return ({
    endpoint: '/GetMessage',
    body: {
      messageid: 0,
    }
  }); },
  add_message: (c: add_message_context) => {return ({
    endpoint: '/AddMessage',
    body: {
      title: c.title,
      text: c.text,
    }
  }); },
  upvote_message: (c: message_vote_context) => {return ({
    endpoint: '/VoteMessage',
    body: {
      vote: 'up',
      messageid: c.messageid,
    }
  }); },
  downvote_message: (c: message_vote_context) => {return ({
    endpoint: '/VoteMessage',
    body: {
      vote: 'down',
      messageid: c.messageid,
    }
  }); },
  add_comment: (c: add_comment_context) => {return ({
    endpoint: '/AddComment',
    body: {
      messageid: c.messageid,
      text: c.text,
    }
  }); },
  upvote_comment: (c: comment_vote_context) => {return ({
    endpoint: '/VoteComment',
    body: {
      vote: 'up',
      commentid: c.commentid,
      messageid: c.messageid
    }
  }); },
  downvote_comment: (c: comment_vote_context) => {return ({
    endpoint: '/VoteComment',
    body: {
      vote: 'down',
    commentid: c.commentid,
    messageid: c.messageid
    }
  }); }
};

export interface add_message_context {
  title: string;
  text: string;
}

export interface comment_vote_context {
  messageid: string;
  commentid: string;
}

export interface message_vote_context {
  messageid: string;
}

export interface add_comment_context {
  messageid: string;
  text: string;
}

@Injectable()
export class RouletteService {

  constructor(private httpClient: HttpClient) {

  }

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
    .authenticate()
      .post<Status>(
        routes.add_message(c).endpoint,
        routes.add_message(c).body);
  }
  upvoteMessage(c: message_vote_context): Observable<Status> {
    return this.httpClient
    .authenticate()
      .post<Status>(
        routes.upvote_message(c).endpoint,
        routes.upvote_message(c).body);
  }
  downvoteMessage(c: message_vote_context): Observable<Status> {
    return this.httpClient
    .authenticate()
      .post<Status>(
        routes.downvote_message(c).endpoint,
        routes.downvote_message(c).body);
  }
  addComment(c: add_comment_context): Observable<Status> {
    return this.httpClient
    .authenticate()
      .post<Status>(
        routes.add_comment(c).endpoint,
        routes.add_comment(c).body);
  }
  upvoteComment(c: comment_vote_context): Observable<Status> {
    return this.httpClient
    .authenticate()
      .post<Status>(
        routes.upvote_comment(c).endpoint,
        routes.upvote_comment(c).body);
  }
  downvoteComment(c: comment_vote_context): Observable<Status> {
    return this.httpClient
    .authenticate()
      .post<Status>(
        routes.downvote_comment(c).endpoint,
        routes.downvote_comment(c).body);
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
  commentid?: string;
  timestamp?: string;
  text: string;
  votes: number;
}
