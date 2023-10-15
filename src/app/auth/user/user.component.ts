import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
import {LoginService} from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  realUser ?: User;
  userSotre : String | null = null;
  lastLoginDateTime : String | null = null;
  constructor(private userShare: UserShareService,
    private loginService : LoginService,
    private router : Router) {
    
  }

 
  onLogout()
  {
    this.loginService.logout().subscribe(
      () => {
        console.log("logout");
        this.userShare.setUser(undefined);
        this.realUser = undefined;
        localStorage.clear();
        this.router.navigate(['/login']);
        location.reload();
        
      });
  }
  ngOnInit() : void {
    //location.reload();
    if(localStorage.getItem("objetUser") != null)
    {
     console.log("objet user : " + localStorage.getItem("objetUser"));
      this.realUser = new User(JSON.parse(localStorage.getItem("objetUser")!));
      console.log("real user : " + this.realUser.identifiant);
    }else
    {
      this.userShare.getUser().subscribe((user) => {
      this.realUser = user;
    });
    }
    if(localStorage.getItem("lastLoginDateTime") != null)
    {
      this.lastLoginDateTime = localStorage.getItem("lastLoginDateTime");
    }else
    {
      const date = new Date();
      const formattedDate = date.toLocaleString();
      this.lastLoginDateTime = formattedDate;
    }
  }
}
