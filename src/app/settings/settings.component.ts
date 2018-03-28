import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { SettingsService, Settings } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings;
  Settings_isLoading: boolean;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.Settings_isLoading = true;
    this.settingsService.getSettings()
      .pipe(finalize(() => { this.Settings_isLoading = false; }))
      .subscribe((settings: Settings) => { this.settings = settings; });
  }

}
