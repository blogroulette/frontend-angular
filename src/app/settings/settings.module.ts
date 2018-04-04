import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    SettingsService
  ]
})
export class SettingsModule { }
