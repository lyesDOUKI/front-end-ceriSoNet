import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationComponent } from './publication/publication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { FiltrePostComponent } from './filtre-post/filtre-post.component';



@NgModule({
  declarations: [
    PublicationComponent,
    AddPostComponent,
    FiltrePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [PublicationComponent,
    AddPostComponent,
    FiltrePostComponent
  ]
})
export class ContenuModule { }