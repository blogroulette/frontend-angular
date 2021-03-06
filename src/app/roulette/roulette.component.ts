import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { RouletteService, Message, Comment, Status } from './roulette.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})

export class RouletteComponent implements OnInit {

  message: Message;
  isLoading: boolean;
  write_new_message: boolean;
  write_new_comment: boolean;
  status: Status;
  newmessageForm: FormGroup;
  addcommentForm: FormGroup;

  constructor(private rouletteService: RouletteService,
    private formBuilder: FormBuilder) {
    this.createForm();
    this.write_new_message = false;
    this.write_new_comment = false;
    this.isLoading = false;
  }



  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.isLoading = true;
    this.rouletteService.getRandomMessage()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((message: Message) => { message.comments.reverse(); this.message = message; });
  }
  getDoc() {
    this.isLoading = true;
    this.rouletteService.getDocumentation()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((message: Message) => { message.comments.reverse(); this.message = message; });
  }
  addComment() {
    if (this.addcommentForm.invalid) { this.status = { status: 'error', error: 'Invalid comment format.' }; return; }
    this.isLoading = true;
    this.rouletteService.addComment({ text: this.addcommentForm.value.text, messageid: this.message.messageid })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.message.comments.unshift({ text: this.addcommentForm.value.text, votes: 0 });
        this.addcommentForm.reset();
        this.write_new_comment = false;
      });
  }
  addMessage() {
    if (this.newmessageForm.invalid) { this.status = { status: 'error', error: 'Invalid message format.' }; return; }
    this.isLoading = true;
    this.rouletteService.addMessage({ title: this.newmessageForm.value.title, text: this.newmessageForm.value.text })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.write_new_message = false;
        this.newmessageForm.reset();
        this.write_new_message = false;
      });
  }
  upvoteComment(comment: Comment) {
    this.rouletteService.upvoteComment({ commentid: comment.commentid, messageid: this.message.messageid })
      .subscribe((status: Status) => {
        if (status.status !== 'ok') {
          this.status = status;
        }
        comment.votes = comment.votes * 1 + 1;
      });
  }
  downvoteComment(comment: Comment) {
    this.rouletteService.downvoteComment({ commentid: comment.commentid, messageid: this.message.messageid })
      .subscribe((status: Status) => {
        if (status.status !== 'ok') {
          this.status = status;
        }
        comment.votes = comment.votes * 1 - 1;
      });
  }
  upvoteMessage() {
    this.rouletteService.upvoteMessage({ messageid: this.message.messageid })
      .subscribe((status: Status) => {
        if (status.status !== 'ok') {
          this.status = status;
        }
        this.message.votes = this.message.votes * 1 + 1;
      });
  }
  downvoteMessage() {
    this.rouletteService.downvoteMessage({ messageid: this.message.messageid })
      .subscribe((status: Status) => {
        if (status.status !== 'ok') {
          this.status = status;
        }
        this.message.votes = this.message.votes * 1 - 1;
      });
  }

  private createForm() {
    this.newmessageForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.addcommentForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

}
