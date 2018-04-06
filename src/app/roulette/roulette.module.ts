import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './roulette.component';
import { RouletteService } from './roulette.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    CoreModule,
    SharedModule,
    RouletteRoutingModule
  ],
  declarations: [
    RouletteComponent
  ],
  providers: [
    RouletteService
  ]
})
export class RouletteModule { }
