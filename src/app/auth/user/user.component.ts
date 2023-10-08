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
      });
  }
  ngOnInit() : void {
   this.userShare.getUser().subscribe((user) => {
     this.realUser = user;
   });
  }
}
