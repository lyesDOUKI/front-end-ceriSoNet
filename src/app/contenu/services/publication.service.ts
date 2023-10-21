import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Publication } from '../models/publication';
import { User } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private URI_NODE_API = environment.URI_NODE_API;

  private publicationsSubject: BehaviorSubject<Publication[] | null> = new BehaviorSubject<Publication[] | null>([]);
  public publications$: Observable<Publication[] | null> = this.publicationsSubject.asObservable();

  private usersSubject: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>([]);
  public users$: Observable<User[] | null> = this.usersSubject.asObservable();

  private buttonLikeSubject = new Subject<void>();

  likeSubmit = this.buttonLikeSubject.asObservable();
  etatLike : boolean = false;

  private buttonCommentSubject = new Subject<void>();

  commentSubmit = this.buttonCommentSubject.asObservable();
  etatComment : boolean = false;

  private bouttonAddSubject = new Subject<void>();
  addSubmit = this.bouttonAddSubject.asObservable();
  etatAdd : boolean = false;

  private boutonShareSubject = new Subject<void>();
  shareSubmit = this.boutonShareSubject.asObservable();
  etatShare : boolean = false;

  triggerShareSubmit() {
      
      this.boutonShareSubject.next();
      
    }
  getEtatShare()
  {
    return this.etatShare;
  }
  setEtatShare(etat : boolean)
  {
    this.etatShare = etat;
  }
  triggerAddSubmit() {
    
    this.bouttonAddSubject.next();
    
  }
  getEtatAdd()
  {
    return this.etatAdd;
  }
  setEtatAdd(etat : boolean)
  {
    this.etatAdd = etat;
  }
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
    this.loadUsers();
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
  users : User[] | null= [];
 loadUsers() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    this.http.get<User[]>(this.URI_NODE_API + '/getAllUsers', options).subscribe(
      (data) => {
        this.usersSubject.next(data.body);
      }
    );
  }
  getPublications() {
    return this.publications$;
  }
  getUsers() {
    return this.users$;
  }
  async getPublicationByFiltreHashtag(trie: string, filtre: string[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    try {
      const response = await firstValueFrom(this.http.
      get<Publication[]>(this.URI_NODE_API + '/publication/' + trie + '/' + filtre.join(','), options));
      console.log("dans le next data");
      if(response!.body?.length === 0)
      {
        this.isBadResult = true;
      }
      this.publicationsSubject.next(response!.body);
      this.spinnerOn = false;
      console.log("spinner dans service : " + this.spinnerOn);
    } catch (error) {
      this.spinnerOn = false;
      console.error("Une erreur s'est produite lors de la récupération des publications : " + error);
    }
  }

  async getPublicationByFiltre(trie: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };
  
    try {
      const response = await firstValueFrom(this.http.
      get<Publication[]>(this.URI_NODE_API + '/publication/' + trie, options));
      console.log("dans le next data");
      this.publicationsSubject.next(response!.body);
      this.spinnerOn = false;
      console.log("spinner dans service : " + this.spinnerOn);
    } catch (error) {
      this.spinnerOn = false;
      console.error("Une erreur s'est produite lors de la récupération des publications : " + error);
    }
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
  //ajout post
  addPublication(body: string, images: string, hashtags: string[]) {
    const dataToSend = { body : body, images : images, hashtags : hashtags};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.post<HttpResponse<any>>(this.URI_NODE_API + '/addpost', dataToSend, options);
  }
  sharePublication(post : Publication, shareText : string, imageURL : string) {
    const dataToSend = {postid: post._id, body : post.body, imageURL : imageURL, hashtags : post.hashtags,
    shareText : shareText};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };
    console.log("partager le post id : " + post._id)
    return this.http.post<HttpResponse<any>>(this.URI_NODE_API + '/sharepost', dataToSend, options);
  }
  //get post by id
  getPublicationById(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response',
      withCredentials: true
    };
    return this.http.get<HttpResponse<Publication>>(this.URI_NODE_API + '/post/' + id, options);
  }

  spinnerOn : boolean = false;
  setSpinnerOn(etat : boolean)
  {
    this.spinnerOn = etat;
  }
  getSpinnerOn()
  {
    return this.spinnerOn;
  }
  isBadResult : boolean = false;
  getIsBadResult()
  {
    return this.isBadResult;
  }
  setIsBadResult(etat : boolean)
  {
    this.isBadResult = etat;
  }
}
