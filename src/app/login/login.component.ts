import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, Credentials, Response } from '@app/core';
import { PasswordTestService, Check } from '@app/shared';
import { of } from 'rxjs/observable/of';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  message: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading = false;
  register_user = false;
  check: Check;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private passwordTestService: PasswordTestService,
    private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe((response: Response) => {
        this.message = response.status;
        this.router.navigate(['/'], { replaceUrl: true });
      }, (error) => { this.error = this.message; });
  }

  register() {
    this.isLoading = true;
    this.authenticationService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    })
      .pipe(finalize(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe((response: Response) => {
        this.message = response.status;
        this.router.navigate(['/'], { replaceUrl: true });
      }, (error) => { this.error = this.message; });
  }

  passwordtest() {
    this.check = this.passwordTestService.TestPassword(this.registerForm.value.password);
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
      rpassword: ['', Validators.required]
    });
  }

}
