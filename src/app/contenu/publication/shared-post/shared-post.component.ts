import { Component, Input } from '@angular/core';
import { Publication } from '../../models/publication';

@Component({
  selector: 'app-shared-post',
  templateUrl: './shared-post.component.html',
  styleUrls: ['./shared-post.component.css']
})
export class SharedPostComponent {

  @Input() post !: Publication;

}
