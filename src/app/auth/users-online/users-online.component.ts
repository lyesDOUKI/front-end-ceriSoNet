import { Component, OnInit } from '@angular/core';
import { UserShareService } from '../services/user-share.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css']
})
export class UsersOnlineComponent implements OnInit{
  
  //list of users
  users: string[] | null = [];
  isConnected : boolean = false;
  identifiant : string = "";
  //remplir la liste des users
  constructor(private share : UserShareService,
    private loginService : LoginService) { }
  ngOnInit(): void {
    if(localStorage.getItem("objetUser"))
    {
      this.isConnected = true;
      this.identifiant = localStorage.getItem("user")!;
      this.getUsers();
      this.observeNewUser();
    }
    console.log("je suis dans le on init de users online");
    this.share.getUser().subscribe((user) => {
      if(user)
      {
        this.identifiant = user.identifiant;
        this.isConnected = true;
        this.getUsers();
        this.observeNewUser();
      }
    });
   
      
      
    }
  getUsers() : void 
  {
    this.loginService.usersOn().subscribe((response) => {
      this.users = response?.body;
      localStorage.setItem("users", JSON.stringify(this.users));
      const index = this.users?.indexOf(this.identifiant);

      if (index! > -1) {
        this.users!.splice(index!, 1); // Supprime un élément à l'index donné
      }
    });
  }
  observeNewUser()
  {
    this.share.getIdentifiant().subscribe((identifiant) => {
      if(identifiant)
      {
        
        if(this.users?.includes(identifiant))
        {
          const index = this.users?.indexOf(identifiant);

         if (index! > -1) {
            this.users!.splice(index!, 1); // Supprime un élément à l'index donné
          }
          
        }else{
          this.users?.push(identifiant);
        }
      }
      
    });
  }
}
