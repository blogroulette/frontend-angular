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
                this.write_new_message= false;
                this.write_new_comment= false;
                this.isLoading=false;
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
    alert("addComment");
    this.isLoading = true;
    this.rouletteService.addComment({ messageid: "testid", text: "testinhalt"})
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.write_new_comment = false;
      });
  }
  addMessage(){
    alert("addMessage");
    this.isLoading = true;
    this.rouletteService.addMessage( { title: "testtitle", text: "testinhalt"})
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((status: Status) => {
        this.status = status;
        this.write_new_message = false;
      });
  }
  upvoteComment(comment: Comment){
    alert("upvoteComment" + comment);
    this.rouletteService.upvoteComment({id: comment.commentid})
      .subscribe((status: Status) => {
        this.status = status;
        comment.votes = comment.votes +1;
      });
  }
  protected downvoteComment(comment: Comment){
    alert("downvoteComment" + comment);
    this.rouletteService.downvoteComment({id: comment.commentid})
      .subscribe((status: Status) => {
        this.status = status;
        comment.votes = comment.votes -1;
      });
  }
  protected upvoteMessage(){
    alert("upvoteMessage");
    this.rouletteService.upvoteMessage({id: this.message.messageid})
      .subscribe((status: Status) => {
        this.status = status;
        this.message.votes = this.message.votes +1;
      });
  }
  protected downvoteMessage(){
    alert("downvoteMessage");
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
