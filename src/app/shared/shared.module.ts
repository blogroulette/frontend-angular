import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent, PasswordTestService} from '@app/shared';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    PasswordTestService
  ]
})
export class SharedModule { }
