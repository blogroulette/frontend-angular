import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule, MockAuthenticationService, AuthenticationService } from '@app/core';
import { SharedModule } from '@app/shared';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [SettingsComponent],
      providers: [SettingsService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
