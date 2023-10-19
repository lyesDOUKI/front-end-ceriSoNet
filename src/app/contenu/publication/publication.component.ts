import { Component, ElementRef, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  modalRef?: NgbModalRef;
  constructor(private publicationServie : PublicationService, private el : ElementRef,
    private modalService : NgbModal,) { }
  
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
  openLoginModal() {
    this.modalRef = this.modalService.open(this.loginModal, { centered: true });
  }
}
