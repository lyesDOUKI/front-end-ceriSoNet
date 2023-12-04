import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserShareService } from '../services/user-share.service';
import {LoginService} from '../services/login.service';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/commun.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  isBadResult : boolean = false;
  spinnerOn : boolean = false;
  realUser ?: User;
  userSotre : String | null = null;
  lastLoginDateTime : string | undefined | null;
  constructor(private userShare: UserShareService,
    private loginService : LoginService,
    private router : Router,
    private commun : CommunService) {
      this.lastLoginDateTime = localStorage.getItem('lastLoginDateTime');
  }

 
  onLogout()
  {
    this.spinnerOn = true;
    this.loginService.logout().subscribe(
      () => {
        console.log("logout");
        this.userShare.setUser(undefined);
        this.realUser = undefined;
        localStorage.clear();
        this.spinnerOn = false;
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
      this.lastLoginDateTime = this.realUser?.date_co;
    });
    }
  }
  formateDate(date : Date) : String
  {
    const dateFormat = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const heureFormat = date.getHours() + ":" + date.getMinutes();
    const formattedDate = dateFormat + " " + heureFormat;
    return formattedDate;
  }
  spinnerOn2 : boolean = false;
  voirMesPublication()
  {
    this.spinnerOn2 = true;
    //recuperer les publications de l'utilisateur connecté avec son id
    this.loginService.getPublicationByUser(this.realUser?.id!).subscribe(
      (response) => {

        this.spinnerOn2 = false;
        if(response.body?.length === 0)
        {
          this.isBadResult = true;
          if(this.isBadResult){
            setTimeout(() => {
              this.isBadResult = false;
            }, 2000);
          }
        }else
        {
          this.commun.setSharedData(response.body);
        }
      }
    );
  }
}
