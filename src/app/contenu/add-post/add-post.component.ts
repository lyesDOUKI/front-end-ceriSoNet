import { Component } from '@angular/core';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  constructor(private publicationService : PublicationService) { }
  hashtagQuery: string = '';
  suggestedHashtag: string = '';
  hashtagList: string[] = [];
  suggestHashtag(event: any) {
    const inputText = event.target.value;
    if (inputText.startsWith('#')) {
      this.suggestedHashtag = '';
    } else {
      this.suggestedHashtag = '#';
    }
  }

  addHashtag() {
    if (this.hashtagQuery.length > 1 && !this.post.hashtags.includes(this.hashtagQuery)) {
      this.post.hashtags.push(this.hashtagQuery);
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
  post = {
    body: '',
    images: '',
    hashtags: [] as string[]
  };


  submitForm() {
      if(localStorage.getItem("objetUser")){
        this.publicationService.setEtatAdd(true);
      console.log('Formulaire ajout post soumis !');
      console.log('Données du formulaire :', this.post);
      this.publicationService.addPublication(
        this.post.body,
        this.post.images,
        this.post.hashtags
      ).subscribe((respose) =>{
        console.log("status : " + respose.status);
        if(respose.status == 200){
          console.log("publication ajouté");
        }
      });
    }else{
      console.log("vous n'etes pas connecté");
      this.publicationService.setEtatAdd(false);
    }
    this.publicationService.triggerAddSubmit();
      // Réinitialisez les valeurs du formulaire si nécessaire.
      this.post = {
        body: '',
        images: '',
        hashtags: []
      };
      this.hashtagQuery = '';
  }
}
