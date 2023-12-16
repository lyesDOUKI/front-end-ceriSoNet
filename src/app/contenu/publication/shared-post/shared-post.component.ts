import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-shared-post',
  templateUrl: './shared-post.component.html',
  styleUrls: ['./shared-post.component.css']
})
export class SharedPostComponent {

  @Input('sharedPost') sharedPost : Publication | undefined;
  
}
