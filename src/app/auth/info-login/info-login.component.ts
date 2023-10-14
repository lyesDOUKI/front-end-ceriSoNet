import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
@Component({
  selector: 'app-info-login',
  templateUrl: './info-login.component.html',
  styleUrls: ['./info-login.component.css']
})
export class InfoLoginComponent {
  lastLoginDateTime: String | null = null;

  constructor(private userShare: UserShareService) {
  }
 
  ngOnInit(): void {
    if(localStorage.getItem("lastLoginDateTime") != null)
    {
      this.lastLoginDateTime = localStorage.getItem("lastLoginDateTime");
    }else
    {
        this.userShare.getUser().subscribe((user) => {
        if(user)
        {
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString();
          this.lastLoginDateTime = formattedDate;
        }
      });
   }
  }
  

}
