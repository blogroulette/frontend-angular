import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule, MockAuthenticationService, AuthenticationService } from '@app/core';
import { SharedModule } from '@app/shared';
import { RouletteComponent } from './roulette.component';
import { RouletteService } from './roulette.service';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';

describe('RouletteComponent', () => {
  let component: RouletteComponent;
  let fixture: ComponentFixture<RouletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
        MarkdownModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [RouletteComponent],
      providers: [RouletteService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
