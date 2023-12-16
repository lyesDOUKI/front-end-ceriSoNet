import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ProfiLShareDataService} from '../services/profil-share-data.service'
import { LoginService} from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  spinnerOn : boolean = false;
  ngOnInit(): void {
    if(localStorage.getItem("user") != null){
      this.isLoggedIn = true;
      
    }
    

    this.profilShareData.getUser().subscribe((user) => {
      
      if(user)
      {
        this.isLoggedIn = true;
      }
    });
    
  }
  @ViewChild('loginForm') loginForm!: NgForm;

  info : any = {};
  user ?: User
  isLoggedIn : boolean = false;
  
  constructor(private loginService : LoginService,
     private profilShareData : ProfiLShareDataService,
     private router : Router)
      {}

  onSubmit() {
    this.spinnerOn = true;
    this.loginService.login(this.info.username, this.info.password).subscribe({
      next :Response => {
        
        if(Response.status == 200){
          this.isLoggedIn = true;
          this.user = new User(Response.body);
          this.profilShareData.setUser(this.user);
          
          
          
          
          localStorage.setItem("user",this.user.identifiant);
          localStorage.setItem("objetUser", JSON.stringify(this.user));
          localStorage.setItem('lastLoginDateTime', this.user.date_co);
          this.spinnerOn = false;
          this.profilShareData.triggerFormSubmit();
          //location.reload();
          this.router.navigate(['']);
        }
      },
      error : error => {
        this.spinnerOn = false;
        
        this.profilShareData.setUser(undefined);
        
        this.profilShareData.triggerFormSubmit();
      }
      
  });
   
  }
}