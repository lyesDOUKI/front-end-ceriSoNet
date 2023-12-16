import { Component, HostListener, OnInit } from '@angular/core';
import { ProfiLShareDataService } from '../auth/services/profil-share-data.service';
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
  isWarningAddPost : boolean = false;
  isPostOk : boolean = false;
  isShareOk : boolean = false;
  notifyNewPost : boolean = false;
  notifyPostWasShared : boolean = false;
  isNotificationActive: boolean = false;
  isWarningShare : boolean = false;
  messageInfo : string = "";
  user : User | undefined | null = null ;
  constructor(private service: ProfiLShareDataService, private router : Router,
    private publicationService : PublicationService) {}


    /*
    l'appel service.setIdentifiant()
    ==> utilisé pour exploiter l'envoi des websockets
    ==> un observeur est mis en place, il est déclenché à chaque fois que l'identifiant est modifié
    ==> ça nous permet de mettre à jour la liste des utilisateurs connectés en temps réel
    */
 
    /*
    Le mécanisme repose sur la gestion d'événements déclenchés par le serveur de sockets
     on met à jour l'état du composant pour afficher des notifications visuelles
     des observables sont mis en place pour écouter les événements
     une fois déclenchés, on met à jour l'état du composant pour afficher des notifications
    */
  ngOnInit() {
    this.publicationService.shareSubmit.subscribe(() => {
      
      
        if(!this.publicationService.getEtatShare())
        {
          this.isNotificationActive = true;
          this.showScrollToTop = false;
          this.isWarningShare = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isWarningShare = false;
            this.isNotificationActive = false;
          }, 3000);
        }else
        {
          this.showScrollToTop = false;
          this.isShareOk = true;
          this.isNotificationActive = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isShareOk = false;
            this.isNotificationActive = false;
          }, 3000);
        }
    });
    this.publicationService.addSubmit.subscribe(() => {
      
      
        if(!this.publicationService.getEtatAdd())
        {
          this.isNotificationActive = true;
          this.showScrollToTop = false;
          this.isWarningAddPost = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isWarningAddPost = false;
            this.isNotificationActive = false;
          }, 3000);
        }else
        {
          this.showScrollToTop = false;
          this.isPostOk = true;
          this.isNotificationActive = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isPostOk = false;
            this.isNotificationActive = false;
          }, 3000);
        }
    });

    this.publicationService.commentSubmit.subscribe(() => {
      
      
        if(!this.publicationService.getEtatComment())
        {
          this.isNotificationActive = true;
          this.showScrollToTop = false;
          this.isWarningComments = true;
          setTimeout(() => {
            this.showScrollToTop = true;
            this.isWarningComments = false;
            this.isNotificationActive = false;
          }, 3000);
        }
    });
    this.publicationService.likeSubmit.subscribe(() => {
      
      
        if(!this.publicationService.getEtatLike())
        {
          this.isNotificationActive = true;
          this.showScrollToTop = false;
          this.isWarningLikes = true;
          setTimeout(() => {
            this.isNotificationActive = false;
            this.showScrollToTop = true;
            this.isWarningLikes = false;
          }, 3000);
        }
    });
    this.service.formSubmit.subscribe(() => {
      
      this.user = this.service.getUserObject();
      if(this.user != null){
        this.isNotificationActive = true;
        window.localStorage.setItem("user",this.user!.identifiant);
        this.showScrollToTop = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isSuccess = false;
        }, 3000);
      }else if(this.user === undefined)
      {
        this.isNotificationActive = true;
        this.showScrollToTop = false;
        this.isFailedConnect = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isFailedConnect = false;
        }, 3000);
      }  
    });
    const socket = io(environment.URI_NODE_API);
    socket.on('notify', (message) => {
      this.loadUser();
      this.service.setIdentifiant(message);
      
      if(this.user != undefined && message !== this.user.identifiant){
        this.messageInfo = message;
        this.isNotificationActive = true;
        this.showScrollToTop = false;
        this.isUserLogin = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isUserLogin = false;
        }, 3000);
      }
    });
    socket.on('logout', (message) => {
      this.loadUser();
      this.service.setIdentifiant(message);
      
      
      if(this.user != undefined && message !== this.user.identifiant){
        this.messageInfo = message;
        this.isNotificationActive = true;
        this.showScrollToTop = false;
        this.isLogout = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isLogout = false;
        }, 3000);
      }
    });
    socket.on('like', (message) => {
      this.loadUser();
      
      if(this.user != undefined && message !== this.user.identifiant){
        this.messageInfo = message;
        this.isNotificationActive = true;
        this.showScrollToTop = false;
        this.isPostLike = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isPostLike = false;
        }, 3000);
      }
    });
    socket.on('comment', (message) => {
      this.loadUser();
      if(this.user != undefined && message !== this.user.identifiant){
        this.isNotificationActive = true;
        this.messageInfo = message;
        this.showScrollToTop = false;
        this.isCommentPost = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.isCommentPost = false;
        }, 3000);
      }
    });
    socket.on('addPost', (message) => {
      this.loadUser();
      if(this.user != undefined && message !== this.user.identifiant){
        this.isNotificationActive = true;
        this.messageInfo = message;
        this.showScrollToTop = false;
        this.notifyNewPost = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.notifyNewPost = false;
        }, 3000);
      }
    });
    socket.on('sharePost', (message) => {
      this.loadUser();
      if(this.user != undefined && message !== this.user.identifiant){
        this.isNotificationActive = true;
        this.messageInfo = message;
        this.showScrollToTop = false;
        this.notifyPostWasShared = true;
        setTimeout(() => {
          this.isNotificationActive = false;
          this.showScrollToTop = true;
          this.notifyPostWasShared = false;
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
  loadUser() : void
  {
    if((this.user == undefined || null) && localStorage.getItem("objetUser"))
    {
      this.user = new User(JSON.parse(localStorage.getItem("objetUser")!));
    }

  }
}
