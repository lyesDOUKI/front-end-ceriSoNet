import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ContenuModule } from './contenu/contenu.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ContenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
