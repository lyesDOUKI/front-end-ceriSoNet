import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/auth/models/user';
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
  @ViewChild('loginModal') loginModal!: NgbModal;
  @ViewChild('shareModal') shareModal!: NgbModal;
  modalRef?: NgbModalRef;
  spinnerOn : boolean = true;
  spinnerOnForShare : boolean = false;
  spinnerOnSharedPost : boolean[] = [];
  constructor(private publicationServie : PublicationService, private el : ElementRef,
    private modalService : NgbModal) { }
  
  nextPage() {
    
    
    const element = document.querySelector('#lespostes'); // Remplacez 'votre-div-id' par l'ID de votre div cible
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
    const element = document.querySelector('#lespostes'); // Remplacez 'votre-div-id' par l'ID de votre div cible
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
  
    this.publicationServie.getUsers().subscribe(
      {
        next: (response) => {
          
          if (response && response.length > 0) {
            this.listUsers = response;
            usersLoaded = true;
  
            if (publicationsLoaded) {
              this.handleDataLoaded();
            }
          }
        }
      }
    );
  
    this.publicationServie.getPublications().subscribe(
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
              this.handleDataLoaded();
            }
          }
        },
        error: (error) => {
          this.spinnerOn = false;
          console.error("Une erreur s'est produite lors de la récupération des publications : " + error);
          publicationsLoaded = true;
  
          if (usersLoaded) {
            this.handleDataLoaded();
          }
        },
        complete: () => {
          console.log("complete");
          this.spinnerOn = false;
          publicationsLoaded = true;
  
          if (usersLoaded) {
            this.handleDataLoaded();
          }
        }
      }
    );
  }
  // Cette méthode est appelée lorsque les données des utilisateurs et des publications sont chargées.
  private handleDataLoaded() {
    
    console.log("Données des utilisateurs et des publications chargées avec succès.");
    console.log("publications : " + this.listPublications);
    console.log("users : " + this.listUsers?.length);
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
      this.publicationServie.setEtatLike(true);
      if(post)
      {
        this.publicationServie.likePublication(post!._id).subscribe(
          (response) => {
            if(response.body)
            {
              console.log("response : " + response.body);
              var postTmp = new Publication(response.body);
              console.log("is instance of Publication : " + (postTmp instanceof Publication));
              console.log("likes : " + postTmp.likes);
              post.likes = postTmp.likes;
            }
          }
        );
      }
    }else
    {
      this.publicationServie.setEtatLike(false);
    }
    this.publicationServie.triggerLikeSubmit();
  }
  sharedPost !: Publication;
  async openLoginModal(post: Publication, i : Number) {

    console.log("execution requête");
    console.log("id shared : " + post.shared);
    this.spinnerOnSharedPost[i as number] = true;
    try {
      const response = await firstValueFrom(this.publicationServie.getPublicationById(post.shared));
  
      console.log("récupération de la sharedPost");
      console.log("response : " + JSON.stringify(response));
      
      if (response!.body) {

        this.sharedPost = new Publication(response!.body);
        console.log("is instance of Publication : " + (this.sharedPost instanceof Publication));
        console.log("body : " + this.sharedPost.body);
      }
      this.spinnerOnSharedPost[i as number] = false;
      this.modalRef = this.modalService.open(this.loginModal, { centered: true });
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
      this.publicationServie.setEtatShare(false);
      console.log("vous n'etes pas connecté");
      this.publicationServie.triggerShareSubmit();
    }
  }
  
  shareText : string = "";
  imageURL : string = "";
  submitForm()
  {
    if(localStorage.getItem("objetUser"))
    {
      this.spinnerOnForShare = true;
      this.publicationServie.setEtatShare(true);
      this.sharePost(this.postToShare, this.shareText, this.imageURL);
      this.modalRef?.close();
    }else{
      this.publicationServie.setEtatShare(false);
      console.log("vous n'etes pas connecté");
    }
    this.publicationServie.triggerShareSubmit();

  }
  sharePost(post : Publication, shareText : string, imageURL : string)
  {
    this.publicationServie.sharePublication(post, shareText, imageURL).subscribe(
     {
        next : (response) => {
          if(response.body)
          {
            console.log("partage OK");
            this.spinnerOnForShare = false;
          }
        },
        error : (err) => {
          console.log("erreur : " + err);
          this.spinnerOnForShare = false;
        }
     }
    );
  }
}