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
  }

  ngOnInit() {
    this.getMessage();
  }
  getMessage(){
    this.isLoading = true;
    this.rouletteService.getRandomMessage()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((message: Message) => { this.message = message; });
  }
  getDoc(){
    this.isLoading = true;
    this.rouletteService.getDocumentation()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((doc: Message) => { this.message = doc; });
  }
  addComment(){
    this.isLoading = true;
    this.rouletteService.addComment(this.addcommentForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.write_new_comment = false;
      });
  }
  addMessage(){
    this.isLoading = true;
    this.rouletteService.addMessage(this.newmessageForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.write_new_message = false;
      });
  }
  upvoteComment(comment: Comment){
    this.rouletteService.upvoteComment({id: comment.commentid})
      .subscribe((status: Status) => {
        this.status = status;
        comment.votes = comment.votes +1;
      });
  }
  downvoteComment(comment: Comment){
    this.rouletteService.downvoteComment({id: comment.commentid})
      .subscribe((status: Status) => {
        this.status = status;
        comment.votes = comment.votes -1;
      });
  }
  upvoteMessage(){
    this.rouletteService.upvoteMessage({id: this.message.messageid})
      .subscribe((status: Status) => {
        this.status = status;
        this.message.votes = this.message.votes +1;
      });
  }
  downvotemessage(){
    this.rouletteService.upvoteMessage({id: this.message.messageid})
      .subscribe((status: Status) => {
        this.status = status;
        this.message.votes = this.message.votes -1;
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
