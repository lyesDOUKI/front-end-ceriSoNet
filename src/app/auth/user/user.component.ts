import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  realUser ?: User;
  lastLoginDateTime: string | null = null;
  constructor(private userShare: UserShareService) {
    this.lastLoginDateTime = this.getLastLoginDateTime();
    this.updateLastLoginDateTime();
  }

  getLastLoginDateTime(): string | null {
    return localStorage.getItem('lastLoginDateTime');
  }

  updateLastLoginDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    localStorage.setItem('lastLoginDateTime', formattedDate);
  }
  ngOnInit() : void {
   this.userShare.getUser().subscribe((user) => {
     this.realUser = user;
   });
  }
}
