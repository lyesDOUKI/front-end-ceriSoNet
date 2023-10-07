import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { BandeauComponent } from './bandeau/bandeau.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    BandeauComponent,
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
  ]
})
export class AuthModule { }
