import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { ProfiLShareDataService } from '../services/profil-share-data.service';
import {LoginService} from '../services/login.service';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/commun.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  isBadResult : boolean = false;
  spinnerOn : boolean = false;
  profil ?: User;
  userSotre : String | null = null;
  lastLoginDateTime : string | undefined | null;
  constructor(private profilShareData: ProfiLShareDataService,
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
        
        this.profilShareData.setUser(undefined);
        this.profil = undefined;
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
     
      this.profil = new User(JSON.parse(localStorage.getItem("objetUser")!));
      
    }else
    {
      this.profilShareData.getUser().subscribe((user) => {
      this.profil = user;
      this.lastLoginDateTime = this.profil?.date_co;
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
    this.loginService.getPublicationByUser(this.profil?.id!).subscribe(
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
          this.commun.setlistesDesPublications(response.body);
        }
      }
    );
  }
}
