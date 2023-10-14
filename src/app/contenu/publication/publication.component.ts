import { Component } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  listPublications: Publication[] | null | undefined = [];
  constructor(private publicationServie : PublicationService) { }
  ngOnInit(): void {
    this.publicationServie.getPublications().subscribe(
      (response) => {
       if(response.status == 200 && response.body){
        
        response.body.forEach((publication) => {
          this.listPublications?.push(new Publication(publication));
        });
       }
       console.log("list publication : ");
       this.listPublications?.forEach((publication) => {
        console.log(publication.images.url);
       });
      }
    );
  }

}
