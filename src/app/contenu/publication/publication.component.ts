import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  listPublications: Publication[] | null | undefined = [];
  showComments : boolean = false;
  newComment : String = "";
  pageSize: number = 5; // Nombre de publications par page
  startIndex: number = 0; // Index de départ pour l'affichage des publications
  @ViewChild('loginModal') loginModal!: NgbModal;
  @ViewChild('shareModal') shareModal!: NgbModal;
  modalRef?: NgbModalRef;
  constructor(private publicationServie : PublicationService, private el : ElementRef,
    private modalService : NgbModal,
    private spinner: NgxSpinnerService) { }
  
  nextPage() {
    
    
    const element = document.querySelector('#lespostes'); // Remplacez 'votre-div-id' par l'ID de votre div cible
    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
    setTimeout(() => {
      this.startIndex += this.pageSize;
    }, 500);
  }

  // Une méthode pour revenir à la page précédente
  prevPage() {
    this.startIndex -= this.pageSize;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.publicationServie.getPublications().subscribe(
      (response) => {
        this.listPublications = [];
        console.log("changement!! ");
        console.log("taille resultat : " + response?.length);
        response?.forEach((publication) => {
          this.listPublications?.push(new Publication(publication));
        });
       
       console.log("list publication : ");
       /*this.listPublications?.forEach((publication) => {
        console.log(publication.images.url);
       });*/
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
  async openLoginModal(post: Publication) {


    this.spinner.show();
    console.log("execution requête");
    console.log("id shared : " + post.shared);
  
    try {
      const response = await firstValueFrom(this.publicationServie.getPublicationById(post.shared));
  
      console.log("récupération de la sharedPost");
      console.log("response : " + JSON.stringify(response));
  
      if (response!.body) {
        this.sharedPost = new Publication(response!.body);
        console.log("is instance of Publication : " + (this.sharedPost instanceof Publication));
        console.log("body : " + this.sharedPost.body);
      }
      this.spinner.hide();
      this.modalRef = this.modalService.open(this.loginModal, { centered: true });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du post : " + error);
    }
  }
  openshareModal()
  {
    if(localStorage.getItem("objetUser"))
    {
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
  submitForm(post : Publication)
  {
    if(localStorage.getItem("objetUser"))
    {
      this.publicationServie.setEtatShare(true);
      this.sharePost(post, this.shareText, this.imageURL);
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
     (response) =>
     {
        if(response.body)
        {
          console.log("c'est good");
        }
     }
    );
  }
}