import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user !: Promise<User>; 
  realUser ?: User;
  constructor(private userShare: UserShareService) {}

  ngOnInit() : void {
    this.userShare.getUser().subscribe(user => {
      this.realUser = user;
      console.log(this.realUser?.identifiant);
    })
  }

}
