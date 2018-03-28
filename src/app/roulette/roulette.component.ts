import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { RouletteService, Message } from './roulette.service';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

  messages: Message[];
  messages_isLoading: boolean;

  constructor(private rouletteService: RouletteService) { }

  ngOnInit() {
    this.messages_isLoading = true;
    this.rouletteService.getMessages()
      .pipe(finalize(() => { this.messages_isLoading = false; }))
      .subscribe((messages: Message[]) => { this.messages = messages; });
  }

}
