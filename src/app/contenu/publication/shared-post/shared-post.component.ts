import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-shared-post',
  templateUrl: './shared-post.component.html',
  styleUrls: ['./shared-post.component.css']
})
export class SharedPostComponent {

  @Input('sharedPost') sharedPost !: Publication;
  /*sharedPost !: Publication;
  constructor(private service : PublicationService)
  {}
  getPostById()
  {
    this.service.getPublicationById(this.post.shared).subscribe(
      (response) =>
      {
        if(response.body)
        {
          this.sharedPost = new Publication(response.body);
          console.log("is instance of Publication : " + (this.sharedPost instanceof Publication));
        }
      }
    );
  }*/
}
