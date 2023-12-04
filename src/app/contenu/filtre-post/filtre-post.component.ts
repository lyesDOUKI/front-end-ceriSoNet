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
  hashtagQuery: string = '';
  suggestedHashtag: string = '';
  hashtagList: string[] = [];
  usersFiltre : string[] = [];
  selected : string = "date";
  spinnerOn : boolean = false;
  constructor(private publicationServie : PublicationService,
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

    if (this.hashtagQuery.length > 1 && !this.hashtagList.includes(this.hashtagQuery)) {
      this.hashtagList.push(this.hashtagQuery);
    }
    this.hashtagQuery = '';
  }
  addUser(){
    this.usersFiltre.push(this.hashtagQuery);
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
  isBadResult : boolean = false;
  async onSubmit(){
    
    console.log("choix : " + this.selected);
    if(this.login.valid){
      this.spinnerOn = true;
      if(this.hashtagList.length > 0){
        console.log("il y a des hashtag");
      await this.publicationServie.getPublicationByFiltreHashtag(this.selected, this.hashtagList);
      this.spinnerOn = this.publicationServie.getSpinnerOn();
    }
    else{
      console.log("non hashtag");
      await this.publicationServie.getPublicationByFiltre(this.selected);
      this.spinnerOn = this.publicationServie.getSpinnerOn();
    }
   /* const element = document.querySelector('#lespostes'); 
    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
      }*/
    
    this.isBadResult = this.publicationServie.getIsBadResult();
    if(this.isBadResult){
      setTimeout(() => {
        this.isBadResult = false;
        this.publicationServie.setIsBadResult(false);
      }, 2000);
    }
  

  }
}
search()
{
  this.spinnerOn = true;
  const user = 
    this.publicationServie.getListUsers()?.filter((user) => user.identifiant === this.identifiantToSearch);

    const id = user?.at(0)?.id;
    this.publicationServie.getPublicationByUser(id!).subscribe(
      (res)=>{
        this.spinnerOn = false;
        if(res.body?.length === 0)
        {
          this.isBadResult = true;
          if(this.isBadResult){
            setTimeout(() => {
              this.isBadResult = false;
              this.publicationServie.setIsBadResult(false);
            }, 2000);
          }
        }else
        {
          this.communService.setSharedData(res.body);
        }
      }
    );
    this.identifiantToSearch = '';
}
}
