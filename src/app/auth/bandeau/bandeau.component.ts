import { Component, OnInit } from '@angular/core';
import { UserShareService } from '../services/user-share.service';
import { User } from '../models/user';

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css']
})
export class BandeauComponent implements OnInit {
  isSuccess: boolean = false;
  isFailedConnect : boolean = false;
  user : User | undefined | null = null ;
  constructor(private service: UserShareService) {}

  ngOnInit() {
    this.service.formSubmit.subscribe(() => {
      console.log("formulaire soumis")
      this.user = this.service.getUserObject();
      if(this.user != null){
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
}
}
