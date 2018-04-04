import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { RouletteService, Message, Comment } from './roulette.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

  message: Message;
  message_isLoading: boolean;
  write_new_message: boolean;
  write_new_comment: boolean;
  error: string;
  newmessageForm: FormGroup;
  newcommentForm: FormGroup;

  constructor(private rouletteService: RouletteService,
              private formBuilder: FormBuilder) {
                this.createForm();
  }

  ngOnInit() {
    this.getMessage();
  }
  getMessage(){
    this.message_isLoading = true;
    this.rouletteService.getRandomMessage()
      .pipe(finalize(() => { this.message_isLoading = false; }))
      .subscribe((message: Message) => { this.message = message; });
  }
  getDoc(){
    this.message_isLoading = true;
    this.rouletteService.getDocumentation()
      .pipe(finalize(() => { this.message_isLoading = false; }))
      .subscribe((doc: Message) => { this.message = doc; });
  }
  addComment(mid: number){
    alert(this.message.messageid + "" + this.newcommentForm.value.text);
    this.write_new_comment = false;
  }
  addMessage(){
    alert(this.newmessageForm.value.title + "" + this.newmessageForm.value.text);
    this.write_new_comment = false;
  }
  upvoteComment(comment: Comment){
    comment.votes = comment.votes + 1;
  }
  downvoteComment(comment: Comment){
    comment.votes = comment.votes - 1;
  }
  upvoteMessage(){
    this.message.votes = this.message.votes + 1;
  }
  downvotemessage(){
    this.message.votes = this.message.votes - 1;
  }

  private createForm() {
    this.newmessageForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.newcommentForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
    }

}
