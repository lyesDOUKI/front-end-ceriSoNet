import { Component, ElementRef } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  listPublications: Publication[] | null | undefined = [];
  showComments : boolean = false;
  newComment : String = "";
  constructor(private publicationServie : PublicationService, private el : ElementRef) { }
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
  }
}
