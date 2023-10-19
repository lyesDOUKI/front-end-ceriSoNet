import { Component, ElementRef, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent {

  @Input() post !: Publication;
  newComment : string = "";
  date : string = "";
  hour : string = "";
  spinnerOn : boolean = false;
  constructor(private publicationService : PublicationService)
  {}
  addComment(post: Publication, newComment: string): void {
    if (newComment.trim() === "") {
      console.log("Le champ commentaire est vide. Soumission annulée.");
      return; 
    } 
   console.log("new comment : " + newComment);
   if(localStorage.getItem("objetUser"))
   {
    this.spinnerOn = true;
    this.publicationService.setEtatComment(true);
    console.log("tu peux soumettre ce commentaire");
    const currentDate = new Date();
    this.date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    this.hour = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    this.publicationService.commentPublication(post._id, newComment, this.date, this.hour).subscribe(
      {
        next : (response) => {
          if(response.body)
          {
            console.log("response : " + response.body);
            var postTmp = new Publication(response.body);
            console.log("is instance of Publication : " + (postTmp instanceof Publication));
            console.log("comments : " + postTmp.comments);
            this.spinnerOn = false;
            post.comments = postTmp.comments;
          }
        },
        error : (err) => {
          console.log("erreur : " + err);
          this.spinnerOn = false;
        }
      }
    );
   
   }else
   {
    this.publicationService.setEtatComment(false);
    console.log("tu ne peux pas soumettre ce commentaire");

   }
   this.publicationService.triggerCommentSubmit();
   this.newComment = "";
  }
}
