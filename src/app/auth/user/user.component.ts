import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  realUser ?: User;
  userSotre : String | null = null;
  
  constructor(private userShare: UserShareService,
    private loginService : LoginService) {
    
  }

 
  onLogout()
  {
    this.loginService.logout().subscribe(
      () => {
        console.log("logout");
        //this.isLoggedIn = false;
        this.userShare.setUser(undefined);
        this.realUser = undefined;
        localStorage.clear();
        location.reload();
      });
  }
  ngOnInit() : void {
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
 
  }
}
