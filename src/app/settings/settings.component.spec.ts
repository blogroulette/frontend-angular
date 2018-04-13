import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule, AuthenticationService, MockAuthenticationService } from '@app/core';
import { SharedModule } from '@app/shared';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
      ],
      declarations: [SettingsComponent],
      providers: [
        SettingsService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
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
