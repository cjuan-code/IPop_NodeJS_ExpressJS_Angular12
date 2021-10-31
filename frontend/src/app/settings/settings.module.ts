import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
