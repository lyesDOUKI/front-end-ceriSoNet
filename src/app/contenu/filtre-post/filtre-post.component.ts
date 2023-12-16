import { Component, ViewChild } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { NgForm } from '@angular/forms';
import { CommunService } from 'src/app/commun.service';

@Component({
  selector: 'app-filtre-post',
  templateUrl: './filtre-post.component.html',
  styleUrls: ['./filtre-post.component.css']
})
export class FiltrePostComponent {
  identifiantToSearch: string = '';
  hashtagInput: string = '';
  suggestedHashtag: string = '';
  hashtagList: string[] = [];
  usersFiltre : string[] = [];
  selected : string = "date";
  spinnerOn1 : boolean = false;
  spinnerOn2 : boolean = false;
  constructor(private publicationService : PublicationService,
    private communService : CommunService
    ) { }

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
  addUser(){
    this.usersFiltre.push(this.hashtagInput);
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
  @ViewChild('loginForm') loginForm!: NgForm;
  isBadResult : boolean = false;
  async onSubmit(){
    
    
    if(this.loginForm.valid){
      this.spinnerOn1 = true;
      if(this.hashtagList.length > 0){
        
      await this.publicationService.getPublicationByFiltreHashtag(this.selected, this.hashtagList);
      this.spinnerOn1 = this.publicationService.getSpinnerOn();
    }
    else{
      
      await this.publicationService.getPublicationByFiltre(this.selected);
      this.spinnerOn1 = this.publicationService.getSpinnerOn();
    }
   /* const element = document.querySelector('#lespostes'); 
    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
      }*/
    
    this.isBadResult = this.publicationService.getIsBadResult();
    if(this.isBadResult){
      setTimeout(() => {
        this.isBadResult = false;
        this.publicationService.setIsBadResult(false);
      }, 2000);
    }
  

  }
}
search()
{
  this.spinnerOn2 = true;
  const user = 
    this.publicationService.getListUsers()?.filter((user) => user.identifiant === this.identifiantToSearch);

    const id = user?.at(0)?.id;
    this.publicationService.getPublicationByUser(id!).subscribe(
      (res)=>{
        this.spinnerOn2 = false;
        if(res.body?.length === 0)
        {
          this.isBadResult = true;
          if(this.isBadResult){
            setTimeout(() => {
              this.isBadResult = false;
              this.publicationService.setIsBadResult(false);
            }, 2000);
          }
        }else
        {
          this.communService.setlistesDesPublications(res.body);
        }
      }
    );
    this.identifiantToSearch = '';
}
}
