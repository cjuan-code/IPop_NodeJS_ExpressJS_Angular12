import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ToastrModule } from 'ngx-toaster';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    HomeModule,
    ShopModule,
    AuthModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
