import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserShareService} from '../services/user-share.service'
import { LoginService} from '../services/login.service';

import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  ngOnInit(): void {
    this.userShare.getUser().subscribe((user) => {
      console.log("j observe depuis login component")
      if(user === undefined)
      {
        this.isLoggedIn = false;
      }
    });
    
  }
  @ViewChild('login') login!: NgForm;

  info : any = {};
  user ?: User
  isLoggedIn : boolean = false;
  
  constructor(private loginService : LoginService,
     private userShare : UserShareService )
      {}

  onSubmit() {
    this.loginService.login(this.info.username, this.info.password).subscribe({
      next :Response => {
        console.log("status : " + Response.status);
        if(Response.status == 200){
          this.isLoggedIn = true;
          this.user = new User(Response.body);
          this.userShare.setUser(this.user);
          console.log("is instance of User : ", this.user instanceof User);
          console.log("identfiant : " + this.user.identifiant);
          console.log("fullname :  " + this.user.fullName());
          this.userShare.triggerFormSubmit();
          
        }
      },
      error : error => {
        console.log("identfiant ou mot de passe incorrect " + error.error);
        this.userShare.setUser(undefined);
        
        this.userShare.triggerFormSubmit();
      }
      
  });
   
  }
}