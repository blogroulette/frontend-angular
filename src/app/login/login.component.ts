import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { PasswordTestService, Check } from '@app/shared';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading: boolean;
  register_user: boolean;
  check: Check;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private passwordTest: PasswordTestService,
              private authenticationService: AuthenticationService) {
    this.createForm();
    this.error = null;
    this.isLoading = false;
    this.register_user = false;
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, (error: string) => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  register() {
    this.isLoading = true;
    this.authenticationService.register( { username: this.registerForm.value.username , password: this.registerForm.value.password } )
      .pipe(finalize(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, (error: string) => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }
  passwordtest(){
      this.check = this.passwordTest.TestPassword(this.registerForm.value.password);
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rpassword: ['', Validators.required, this.passwordsmatch]
    });
  }
  passwordsmatch(cg: FormGroup) {
      return cg.value.password == cg.value.rpassword ? null : cg.value.password ;
}

}
