import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { BandeauComponent } from '../bandeau/bandeau.component';
import { InfoLoginComponent } from './info-login/info-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    BandeauComponent,
    InfoLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports : [
    LoginComponent,
    UserComponent,
    BandeauComponent,
    InfoLoginComponent,
  ]
})
export class AuthModule { }
