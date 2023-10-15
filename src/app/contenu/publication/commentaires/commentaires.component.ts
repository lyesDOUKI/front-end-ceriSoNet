import { Component, ElementRef, Input } from '@angular/core';
import { Publication } from '../../models/publication';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent {

  @Input() post !: Publication;
  newComment : String = "";

  addComment(post: any, newComment: String): void {
   
  }

}
