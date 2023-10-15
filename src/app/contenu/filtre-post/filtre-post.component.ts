import { Component, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtre-post',
  templateUrl: './filtre-post.component.html',
  styleUrls: ['./filtre-post.component.css']
})
export class FiltrePostComponent {
  hashtagQuery: string = '';
  suggestedHashtag: string = '';
  hashtagList: string[] = [];
  selected : string = "date";

  constructor(private publicationServie : PublicationService) { }

  suggestHashtag(event: any) {
    const inputText = event.target.value;
    if (inputText.startsWith('#')) {
      this.suggestedHashtag = '';
    } else {
      this.suggestedHashtag = '#';
    }
  }

  addHashtag() {

    if (this.hashtagQuery.length > 1 && !this.hashtagList.includes(this.hashtagQuery)) {
      this.hashtagList.push(this.hashtagQuery);
    }
    this.hashtagQuery = '';
  }
  removeHashtag(hashtag: string) {
    // Supprimer un hashtag de la liste
    const index = this.hashtagList.indexOf(hashtag);
    if (index !== -1) {
      this.hashtagList.splice(index, 1);
    }
  }

  selectFiltre(event : any){
    this.selected = event.target.value;
  }
  @ViewChild('login') login!: NgForm;
  onSubmit(){
    console.log("choix : " + this.selected);
    if(this.login.valid){
      if(this.hashtagList.length > 0){
      this.publicationServie.getPublicationByFiltreHashtag(this.selected, this.hashtagList);
    }else{
      this.publicationServie.getPublicationByFiltre(this.selected);
    }

}
}
}
