import { Component, OnInit } from '@angular/core';
import { UserShareService } from '../auth/services/user-share.service';
import { User } from '../auth/models/user';
import { environment } from 'src/environments/environment.development';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css']
})
export class BandeauComponent implements OnInit {
  isSuccess: boolean = false;
  isFailedConnect : boolean = false;
  isUserLogin : boolean = false;
  user : User | undefined | null = null ;
  constructor(private service: UserShareService) {}

  ngOnInit() {
    this.service.formSubmit.subscribe(() => {
      console.log("formulaire soumis")
      this.user = this.service.getUserObject();
      window.localStorage.setItem("user",this.user!.identifiant);
      if(this.user != null){
        console.log("form");
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      }else if(this.user === undefined)
      {
        this.isFailedConnect = true;
        setTimeout(() => {
          this.isFailedConnect = false;
        }, 3000);
      }  
    });
    const socket = io(environment.URI_NODE_API);
    socket.on('notify', (message) => {
      console.log("message : "+ message);
      console.log("identifiant : " + this.user?.identifiant);
      if(this.user != undefined && message !== this.user.identifiant){
        console.log("socket");
        this.isUserLogin = true;
        setTimeout(() => {
          this.isUserLogin = false;
        }, 3000);
      }
    });
}
}
