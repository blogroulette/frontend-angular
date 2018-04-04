import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { SettingsService, Settings, Status } from './settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings;
  Settings_isLoading: boolean;
  savesettingsForm: FormGroup;
  status: Status;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.Settings_isLoading = true;
    this.settingsService.loadSettings()
      .pipe(finalize(() => { this.Settings_isLoading = false; }))
      .subscribe((settings: Settings) => { this.settings = settings; });
  }
  saveSettings(){
    this.Settings_isLoading = true;
    this.settingsService.saveSettings(this.savesettingsForm.value)
      .pipe(finalize(() => { this.Settings_isLoading = false; }))
      .subscribe((status: Status) => { this.status = status;});
  }
  private createForm() {
    this.savesettingsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      new_password: ['', Validators.required],
      rnew_password: ['', Validators.required]
    });
    }

}
