import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { RouletteService, Message, Comment } from './roulette.service';

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

  constructor(private rouletteService: RouletteService) {
    this.write_new_message=false;
    this.write_new_comment=false;
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
    alert("Add Comment for: " + mid);
    this.write_new_comment = false;
  }


}
