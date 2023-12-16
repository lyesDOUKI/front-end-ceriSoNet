import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilComponent } from './profil/profil.component';
import { BandeauComponent } from '../bandeau/bandeau.component';
import { UsersOnlineComponent } from './users-online/users-online.component';
import { CommunService } from '../commun.service';

@NgModule({
  declarations: [
    LoginComponent,
    ProfilComponent,
    BandeauComponent,
    UsersOnlineComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports : [
    LoginComponent,
    ProfilComponent,
    BandeauComponent,
    UsersOnlineComponent
  ],
  providers : [
    CommunService
  ]
})
export class AuthModule { }
