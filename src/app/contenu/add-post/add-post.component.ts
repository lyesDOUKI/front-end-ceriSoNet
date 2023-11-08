import { Component, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  spinnerOn : boolean = false;
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

    if (this.hashtagQuery.length > 1 && !this.hashtagList.includes(this.hashtagQuery)) {
      this.hashtagList.push(this.hashtagQuery);
    }
    console.log(this.hashtagList);
    this.hashtagQuery = '';
  }
  removeHashtag(hashtag: string) {
    // Supprimer un hashtag de la liste
    console.log(this.hashtagList);
    const index = this.hashtagList.indexOf(hashtag);
    console.log("dans le supprime");
    console.log("le hashtag : " + hashtag);
    console.log("l'index : " + index);
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
    console.log("dans le submit");
    console.log("les hashtags" + this.hashtagList);
      if(localStorage.getItem("objetUser")){
        this.spinnerOn = true;
      console.log('Formulaire ajout post soumis !');
      this.publicationService.addPublication(
        this.post.body,
        this.post.images,
        this.hashtagList
      ).subscribe({
        next: () => {
          this.publicationService.setEtatAdd(true);
          console.log('Publication ajoutée !');
          this.spinnerOn = false;
          this.publicationService.triggerAddSubmit();
        },
        error: (err) => {
          console.log('Erreur lors de l\'ajout de la publication :', err);
          this.spinnerOn = false;
          this.publicationService.setEtatAdd(false);
        }
      });
    }else{
      console.log("vous n'etes pas connecté");
      this.publicationService.setEtatAdd(false);
      this.publicationService.triggerAddSubmit();
    }
    
      // Réinitialisez les valeurs du formulaire si nécessaire.
      this.post = {
        body: '',
        images: '',
        hashtags: []
      };
      this.hashtagQuery = '';
  }
}
