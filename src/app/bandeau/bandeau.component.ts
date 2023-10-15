import { Component, HostListener, OnInit } from '@angular/core';
import { UserShareService } from '../auth/services/user-share.service';
import { User } from '../auth/models/user';
import { environment } from 'src/environments/environment.development';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import { PublicationService } from '../contenu/services/publication.service';
@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css']
})
export class BandeauComponent implements OnInit {
  isSuccess: boolean = false;
  isFailedConnect : boolean = false;
  isUserLogin : boolean = false;
  isLogout : boolean = false;
  isPostLike : boolean = false;
  isWarningLikes : boolean = false;
  isWarningComments : boolean = false;
  isCommentPost : boolean = false;
  user : User | undefined | null = null ;
  constructor(private service: UserShareService, private router : Router,
    private publicationService : PublicationService) {}


  ngOnInit() {

    this.publicationService.commentSubmit.subscribe(() => {
      console.log("comment submit");
      console.log("etat : " + this.publicationService.getEtatComment());
        if(!this.publicationService.getEtatComment())
        {
          this.showScrollToTop = false;
          this.isWarningComments = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isWarningComments = false;
          }, 3000);
        }
    });
    this.publicationService.likeSubmit.subscribe(() => {
      console.log("like submit");
      console.log("etat : " + this.publicationService.getEtatLike());
        if(!this.publicationService.getEtatLike())
        {
          this.showScrollToTop = false;
          this.isWarningLikes = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isWarningLikes = false;
          }, 3000);
        }
    });
    this.service.formSubmit.subscribe(() => {
      console.log("formulaire soumis");
      this.user = this.service.getUserObject();
      if(this.user != null){
        window.localStorage.setItem("user",this.user!.identifiant);
        this.showScrollToTop = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.showScrollToTop = true;
          this.isSuccess = false;
        }, 3000);
      }else if(this.user === undefined)
      {
        this.showScrollToTop = false;
        this.isFailedConnect = true;
        setTimeout(() => {
          this.showScrollToTop = true;
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
        this.showScrollToTop = false;
        this.isUserLogin = true;
        setTimeout(() => {
          this.showScrollToTop = true;
          this.isUserLogin = false;
        }, 3000);
      }
    });
    socket.on('logout', (message) => {
      console.log("message socket logout: "+ message);
      console.log("identifiant socket logout : " + this.user?.identifiant);
      if(this.user != undefined && message !== this.user.identifiant){
        console.log("socket");
        this.showScrollToTop = false;
        this.isLogout = true;
        setTimeout(() => {
          this.showScrollToTop = true;
          this.isLogout = false;
        }, 3000);
      }
    });
    socket.on('like', (message) => {
      if(this.user != undefined && message !== this.user.identifiant){
        console.log("socket");
        this.showScrollToTop = false;
        this.isPostLike = true;
        setTimeout(() => {
          this.showScrollToTop = true;
          this.isPostLike = false;
        }, 3000);
      }
    });
    socket.on('comment', (message) => {
      if(this.user != undefined && message !== this.user.identifiant){
        console.log("socket");
        this.showScrollToTop = false;
        this.isCommentPost = true;
        setTimeout(() => {
          this.showScrollToTop = true;
          this.isCommentPost = false;
        }, 3000);
      }
    });
}
showScrollToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Déterminez à quelle position de défilement vous souhaitez afficher la navbar
    const scrollPosition = window.scrollY;
    if (scrollPosition > 200) { // Ajustez cette valeur en fonction de vos besoins
      this.showScrollToTop = true;
    } else {
      this.showScrollToTop = false;
    }
  }

  scrollToTop() {
    
    this.router.navigate(['']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    //window.scrollTo({ top: 0, behavior: 'smooth' }); // Faites défiler la page vers le haut de manière fluide
  }
}
