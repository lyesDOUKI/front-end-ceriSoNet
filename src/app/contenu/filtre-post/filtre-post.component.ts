import { Component } from '@angular/core';

@Component({
  selector: 'app-filtre-post',
  templateUrl: './filtre-post.component.html',
  styleUrls: ['./filtre-post.component.css']
})
export class FiltrePostComponent {
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

    if (!this.hashtagQuery.startsWith('#')) {
      this.hashtagQuery = this.suggestedHashtag + this.hashtagQuery;
    }
    if (this.hashtagQuery.length > 1 && !this.hashtagList.includes(this.hashtagQuery)) {
      this.hashtagList.push(this.hashtagQuery);
    }
    this.hashtagQuery = '';
  }
}
