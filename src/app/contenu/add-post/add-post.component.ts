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
  hashtagInput: string = '';
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

    if (this.hashtagInput.length > 1 && !this.hashtagList.includes(this.hashtagInput)) {
      this.hashtagList.push(this.hashtagInput);
    }
    
    this.hashtagInput = '';
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
        this.spinnerOn = true;
      
      this.publicationService.addPublication(
        this.post.body,
        this.post.images,
        this.hashtagList
      ).subscribe({
        next: () => {
          this.publicationService.setEtatAdd(true);
          
          this.spinnerOn = false;
          this.publicationService.triggerAddSubmit();
        },
        error: (err) => {
          
          this.spinnerOn = false;
          this.publicationService.setEtatAdd(false);
        }
      });
    }else{
      
      this.publicationService.setEtatAdd(false);
      this.publicationService.triggerAddSubmit();
    }
    
      // Réinitialisez les valeurs du formulaire
      this.post = {
        body: '',
        images: '',
        hashtags: []
      };
      this.hashtagInput = '';
  }
}
