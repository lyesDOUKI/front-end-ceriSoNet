import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService} from '../services/login.service';
import { User } from '../models/user';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  @ViewChild('login') login!: NgForm;
  @ViewChild('loginModal') loginModal!: NgbModal;

  info : any = {};
  user ?: User
  isLoggedIn : boolean = false;
  modalRef?: NgbModalRef;
  constructor(private loginService : LoginService, private modalService : NgbModal
    , private toastr : ToastrService) { }

  onSubmit() {
    this.loginService.login(this.info.username, this.info.password).subscribe({
      next :Response => {
        console.log(Response.status);
        if(Response.status == 200){
          this.isLoggedIn = true;
          this.user = new User(Response.body);
          console.log(this.user instanceof User);
          console.log(this.user.identifiant);
          console.log("Mr " + this.user.fullName());
          this.modalRef?.close();
          this.toastr.success("Bienvenue "+ this.user.identifiant, '',{
            timeOut: 2000
          });
        }
      },
      error : error => {
        console.log("identfiant ou mot de passe incorrect " + error.error);
        this.toastr.error("identfiant ou mot de passe incorrect", '',{
          timeOut: 2000
        });
        
      }
  });
   
  }
  
  openLoginModal() {
    this.modalRef = this.modalService.open(this.loginModal, { centered: true });
  }
}
