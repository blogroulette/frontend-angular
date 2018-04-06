import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './settings/settings.module';
import { RouletteModule } from './roulette/roulette.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    MarkdownModule.forRoot(),
    CoreModule,
    SharedModule,
    RouletteModule,
    SettingsModule,
    LoginModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
