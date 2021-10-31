import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class CoreModule { }
