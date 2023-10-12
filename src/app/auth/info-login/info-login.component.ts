import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
@Component({
  selector: 'app-info-login',
  templateUrl: './info-login.component.html',
  styleUrls: ['./info-login.component.css']
})
export class InfoLoginComponent {
  lastLoginDateTime: string | null = null;
  user : User | undefined;
  constructor(private userShare: UserShareService) {
    this.updateLastLoginDateTime();
    this.lastLoginDateTime = this.getLastLoginDateTime();
    
  }
  ngOnInit(): void {
    
    this.userShare.getUser().subscribe((user) => {
      this.user = user;
    });
  }
  getLastLoginDateTime(): string | null {
    return localStorage.getItem('lastLoginDateTime');
  }

  updateLastLoginDateTime() {
    const currentDate = new Date().toLocaleString();
    
    localStorage.setItem('lastLoginDateTime', currentDate);
  }

}
