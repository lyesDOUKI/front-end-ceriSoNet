import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService} from '../services/login.service';
import { User } from '../models/user';
import {map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  @ViewChild('login') login!: NgForm;

  info : any = {};
  
  constructor(private loginService : LoginService) { }

  onSubmit() {
    this.loginService.login(this.info.username, this.info.password).subscribe(
      Response => {
        console.log(Response.status);
        if(Response.status == 200){
          const user : User = new User(Response.body);
          console.log(user instanceof User);
          console.log(user.identifiant);
          console.log("Mr " + user.fullName());
        }
      }
    );
   
  }
}
