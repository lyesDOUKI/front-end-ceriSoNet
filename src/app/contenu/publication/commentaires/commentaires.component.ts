import { Component, ElementRef, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent {

  @Input() post !: Publication;
  @Input() users : User[] | null | undefined = [];
  newComment : string = "";
  date : string = "";
  hour : string = "";
  spinnerOn : boolean = false;
  constructor(private publicationService : PublicationService)
  {}

  addComment(post: Publication, newComment: string): void {
    if (newComment.trim() === "") {
      
      return; 
    } 
   
   if(localStorage.getItem("objetUser"))
   {
    this.spinnerOn = true;
    this.publicationService.setEtatComment(true);
    
    const currentDate = new Date();
    this.date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    this.hour = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    this.publicationService.commentPublication(post._id, newComment, this.date, this.hour).subscribe(
      {
        next : (response) => {
          if(response.body)
          {
            
            var postTmp = new Publication(response.body);
            
            
            this.spinnerOn = false;
            this.updateComments(postTmp);
            post.comments = postTmp.comments;
          }
        },
        error : (err) => {
          
          this.spinnerOn = false;
        }
      }
    );
   
   }else
   {
    this.publicationService.setEtatComment(false);
    

   }
   this.publicationService.triggerCommentSubmit();
   this.newComment = "";
  }
  updateComments(post : Publication) : void{
    post.comments.forEach((comment) => {
      const user = this.users?.find((user) => {
        if (typeof comment.commentedBy !== 'number') {
          comment.commentedBy = Number(comment.commentedBy);
        } 
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
  }
}
