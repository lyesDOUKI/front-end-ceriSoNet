import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private URI_NODE_API = environment.URI_NODE_API;

  private publicationsSubject: BehaviorSubject<Publication[] | null> = new BehaviorSubject<Publication[] | null>([]);
  public publications$: Observable<Publication[] | null> = this.publicationsSubject.asObservable();

  private buttonLikeSubject = new Subject<void>();

  likeSubmit = this.buttonLikeSubject.asObservable();
  etatLike : boolean = false;

  private buttonCommentSubject = new Subject<void>();

  commentSubmit = this.buttonCommentSubject.asObservable();
  etatComment : boolean = false;
  triggerLikeSubmit() {
    
    this.buttonLikeSubject.next();
    
  }
  triggerCommentSubmit() {
  
    this.buttonCommentSubject.next();
    
  }
  getEtatLike()
  {
    return this.etatLike;
  }
  setEtatLike(etat : boolean)
  {
    this.etatLike = etat;
  }
  getEtatComment()
  {
    return this.etatComment;
  }
  setEtatComment(etat : boolean)
  {
    this.etatComment = etat;
  }
  constructor(private http: HttpClient) {
    this.loadPublications();
  }

  loadPublications() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    this.http.get<Publication[]>(this.URI_NODE_API + '/publication', options).subscribe(
      (data) => {
        this.publicationsSubject.next(data.body);
      }
    );
  }

  getPublications() {
    return this.publications$;
  }

  getPublicationByFiltreHashtag(trie: string, filtre: string[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    this.http.get<Publication[]>(this.URI_NODE_API + '/publication/' + trie + '/' + filtre.join(','), options).subscribe(
      (data) => {
        this.publicationsSubject.next(data.body);
      }
    );
  }

  getPublicationByFiltre(trie: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    this.http.get<Publication[]>(this.URI_NODE_API + '/publication/' + trie, options).subscribe(
      (data) => {
        this.publicationsSubject.next(data.body);
      }
    );
  }
  likePublication(id: number) {
    const dataToSend = {id : id};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.post<HttpResponse<Publication>>(this.URI_NODE_API + '/likes', dataToSend, options);
  }
  commentPublication(_id : number, text: string, date : string, hour : string) {
    const dataToSend = {_id : _id, text : text, date : date, hour : hour};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.post<HttpResponse<Publication>>(this.URI_NODE_API + '/comments', dataToSend, options);
  }
}
