import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';

import { User } from 'src/app/auth/models/user';
import { CommunService } from 'src/app/commun.service';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  listPublications: Publication[] | null | undefined = [];
  listUsers: User[] | null | undefined = [];
  showComments : boolean = false;
  newComment : String = "";
  pageSize: number = 5; // Nombre de publications par page
  startIndex: number = 0; // Index de départ pour l'affichage des publications
  @ViewChild('sharedPostModal') sharedPostModal!: NgbModal;
  @ViewChild('shareModal') shareModal!: NgbModal;
  modalRef?: NgbModalRef;
  spinnerOn : boolean = true;
  spinnerOnForShare : boolean = false;
  spinnerOnSharedPost : boolean[] = [];
  constructor(private publicationService : PublicationService, private el : ElementRef,
    private modalService : NgbModal,
    private commun : CommunService) { }
  
  nextPage() {
    
    
    const element = document.querySelector('#lespostes');
    if (element) {
    element.scrollIntoView( {behavior: 'smooth', block: 'start'} );
    
  }
    setTimeout(() => {
      this.startIndex += this.pageSize;
      window.scrollBy(0, -0);
    }, 500);
  }

  // Une méthode pour revenir à la page précédente
  prevPage() {
    const element = document.querySelector('#lespostes'); 
    if (element) {
    element.scrollIntoView( {behavior: 'smooth', block: 'start'} );
    
  }
    setTimeout(() => {
      this.startIndex -= this.pageSize;
      window.scrollBy(0, -0);
    }, 500);
  }

  // Une méthode pour vérifier si la page précédente existe
  hasPrevPage() {
    return this.startIndex > 0;
  }

  // Une méthode pour vérifier si la page suivante existe
  hasNextPage() {
    return this.startIndex + this.pageSize < this.listPublications!.length;
  }
  ngOnInit(): void {

    
    let usersLoaded = false;
    let publicationsLoaded = false;
  
    this.publicationService.getUsers().subscribe(
      {
        next: (response) => {
          
          if (response && response.length > 0) {
            this.listUsers = response;
            this.publicationService.setListUsers(this.listUsers);
            usersLoaded = true;
  
            if (publicationsLoaded) {
              this.mapperLesPostsEtUsers();
            }
          }
        }
      }
    );
  
    this.publicationService.getPublications().subscribe(
      {
        next: (response) => {
          if (response && response.length > 0) {
            this.startIndex = 0;
            this.listPublications = response;
            this.spinnerOnSharedPost = new Array(this.listPublications.length);
            this.listPublications.forEach((publication) => {
              publication.showComments = false;
            });
            this.spinnerOn = false;
            publicationsLoaded = true;
  
            if (usersLoaded) {
              this.mapperLesPostsEtUsers();
            }
          }
        },
        error: (error) => {
          this.spinnerOn = false;
          console.error("Une erreur s'est produite lors de la récupération des publications : " + error);
          publicationsLoaded = true;
  
          if (usersLoaded) {
            this.mapperLesPostsEtUsers();
          }
        },
        complete: () => {
          
          this.spinnerOn = false;
          publicationsLoaded = true;
  
          if (usersLoaded) {
            this.mapperLesPostsEtUsers();
          }
        }
      }
    );
    this.commun.observeData().subscribe(
      ()=>{
        this.startIndex = 0;
        this.listPublications = this.commun.getlistesDesPublications();

        this.mapperLesPostsEtUsers();
      });
  }
  // Cette méthode est appelée lorsque les données des utilisateurs et des publications sont chargées.
  private mapperLesPostsEtUsers() {
    
    
    //chercher le created by dans listUsers
    this.listPublications?.forEach((publication) => {
     
      const user = this.listUsers?.find((user) => {
        return user.id === publication.createdBy;
      });
      if (user) {
        
        publication.identifiantAuteur = user.identifiant;
        publication.nomAuteur = user.nom;
        publication.prenomAuteur = user.prenom;
        if(user.avatar)
          publication.avatarAuteur = user.avatar;
        else
          publication.avatarAuteur = "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
      }
    });
    //pour les commentaires : 
    this.listPublications?.forEach((publication) => {
      publication.comments.forEach((comment) => {
        const user = this.listUsers?.find((user) => {
          return user.id === comment.commentedBy;
        });
        if (user) {
          
          comment.identifiantAuteur = user.identifiant;
          comment.nomAuteur = user.nom;
          comment.prenomAuteur = user.prenom;
          if(user.avatar)
            comment.avatarAuteur = user.avatar;
          else
            comment.avatarAuteur = "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
        }
      });
    });
  }
  
  
  toggleComments(post: Publication) {
    this.listPublications?.forEach((publication) => {
      if (publication._id !== post._id) {
        publication.showComments = false;
      }
    });
    post.showComments = !post.showComments;

  }
  
  likePost(post: Publication | null) {
    
    if(localStorage.getItem("objetUser"))
    {
      this.publicationService.setEtatLike(true);
      if(post)
      {
        this.publicationService.likePublication(post!._id).subscribe(
          (response) => {
            if(response.body)
            {
              
              var postTmp = new Publication(response.body);
              
              
              post.likes = postTmp.likes;
            }
          }
        );
      }
    }else
    {
      this.publicationService.setEtatLike(false);
    }
    this.publicationService.triggerLikeSubmit();
  }
  sharedPost : Publication | undefined;
  async openSharedPostModal(post: Publication, i : Number) {

    
    
    this.spinnerOnSharedPost[i as number] = true;
    try {
      const response = await firstValueFrom(this.publicationService.getPublicationById(post.shared));
  
      
      if (response!.body) {
        this.sharedPost = new Publication(response!.body);
        
        //recuperer les infos d utilisateurs
        const user = this.listUsers?.find((user) => {
          return user.id === this.sharedPost?.createdBy;
        });
        if (user) {
          
          this.sharedPost.identifiantAuteur = user.identifiant;
          this.sharedPost.nomAuteur = user.nom;
          this.sharedPost.prenomAuteur = user.prenom;
          if(user.avatar)
            this.sharedPost.avatarAuteur = user.avatar;
          else
            this.sharedPost.avatarAuteur = "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";
        }
      }else{
        this.sharedPost = undefined;
      }
      this.spinnerOnSharedPost[i as number] = false;
      this.modalRef = this.modalService.open(this.sharedPostModal, { centered: true });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du post : " + error);
    }
  }

  postToShare !: Publication;
  openshareModal(post : Publication)
  {
    if(localStorage.getItem("objetUser"))
    {
      this.postToShare  = post;
      this.modalRef = this.modalService.open(this.shareModal, { centered: true });
    }else
    {
      this.publicationService.setEtatShare(false);
      
      this.publicationService.triggerShareSubmit();
    }
  }
  
  shareText : string = "";
  imageURL : string = "";
  submitForm()
  {
    if(localStorage.getItem("objetUser"))
    {
      this.spinnerOnForShare = true;
      this.publicationService.setEtatShare(true);
      this.sharePost(this.postToShare, this.shareText, this.imageURL);
      this.modalRef?.close();
    }else{
      this.publicationService.setEtatShare(false);
      
    }
    this.publicationService.triggerShareSubmit();

  }
  sharePost(post : Publication, shareText : string, imageURL : string)
  {
    
    this.publicationService.sharePublication(post, shareText, imageURL).subscribe(
     {
        next : (response) => {
          if(response.body)
          {
            
            this.spinnerOnForShare = false;
          }
        },
        error : (err) => {
          
          this.spinnerOnForShare = false;
        }
     }
    );
  }
  isValidShared(post: any): boolean {
    return post && post.shared !== undefined && typeof post.shared === 'number';
  }
}