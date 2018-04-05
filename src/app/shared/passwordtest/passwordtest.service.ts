import { Component, OnInit, Injectable } from '@angular/core';
import owaspPasswordStrengthTest = require('owasp-password-strength-test');

@Injectable()
export class PasswordTestService implements OnInit {
checker = owaspPasswordStrengthTest;

  constructor() { }

  ngOnInit() { }

  TestPassword(pw: string): Check {
    return this.checker.test(pw);
  }

}

export type Check = {
  errors              : string[];
  failedTests         : number[];
  requiredTestErrors  : string[];
  optionalTestErrors  : string[];
  passedTests         : number[];
  isPassphrase        : boolean;
  strong              : boolean;
  optionalTestsPassed : number;
}
