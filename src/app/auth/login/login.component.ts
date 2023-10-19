import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserShareService} from '../services/user-share.service'
import { LoginService} from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  ngOnInit(): void {
    if(localStorage.getItem("user") != null){
      this.isLoggedIn = true;
      console.log("user local storage : " + localStorage.getItem("user"));
    }
    console.log("j observe depuis login component, isLoggedIn : " + this.isLoggedIn);
    this.userShare.getUser().subscribe((user) => {
      console.log("j observe depuis login component")
      if(user)
      {
        this.isLoggedIn = true;
      }
    });
    
  }
  @ViewChild('login') login!: NgForm;

  info : any = {};
  user ?: User
  isLoggedIn : boolean = false;
  
  constructor(private loginService : LoginService,
     private userShare : UserShareService,
     private router : Router )
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
          localStorage.setItem("user",this.user.identifiant);
          localStorage.setItem("objetUser", JSON.stringify(this.user));
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString();
          localStorage.setItem('lastLoginDateTime', formattedDate);

          this.userShare.triggerFormSubmit();
          //location.reload();
          this.router.navigate(['']);
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