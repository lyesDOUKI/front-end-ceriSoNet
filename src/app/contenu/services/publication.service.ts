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

  /*
  Ce service contients les méthodes qui appellent les routes du serveur NodeJS
  pour les traitements liés aux publications
  il contient aussi les observables qui permettent de notifier le composant Bandeau
  */
  private URI_NODE_API = environment.URI_NODE_API;
  private LOGIN = '/login';
  private PUBLICATION = '/publication';
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

    this.http.get<Publication[]>(this.URI_NODE_API + this.PUBLICATION, options).subscribe(
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

    this.http.get<User[]>(this.URI_NODE_API + this.LOGIN + '/getAllUsers', options).subscribe(
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
      get<Publication[]>(this.URI_NODE_API + this.PUBLICATION + '/' + trie + '/' + filtre.join(','), options));
      
      if(response!.body?.length === 0)
      {
        
        this.isBadResult = true;
      }
      this.publicationsSubject.next(response!.body);
      this.spinnerOn = false;
      
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
      get<Publication[]>(this.URI_NODE_API + this.PUBLICATION + "/" + trie, options));
      
      this.publicationsSubject.next(response!.body);
      this.spinnerOn = false;
      
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

    return this.http.post<HttpResponse<Publication>>(this.URI_NODE_API + this.PUBLICATION + '/likes', dataToSend, options);
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

    return this.http.post<HttpResponse<Publication>>(this.URI_NODE_API + this.PUBLICATION + '/comments', dataToSend, options);
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

    return this.http.post<HttpResponse<any>>(this.URI_NODE_API + this.PUBLICATION + '/addpost', dataToSend, options);
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
    
    return this.http.post<HttpResponse<any>>(this.URI_NODE_API + this.PUBLICATION + '/sharepost', dataToSend, options);
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
    return this.http.get<HttpResponse<Publication>>(this.URI_NODE_API + this.PUBLICATION + '/post/' + id, options);
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
  listUsers: User[] | null | undefined = [];
  getListUsers()
  {
    return this.listUsers;
  }
  setListUsers(users : User[])
  {
    this.listUsers = users;
  }
  getPublicationByUser(id : number)
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response',
      withCredentials: true
    };
    return this.http.get<Publication []>(this.URI_NODE_API + this.PUBLICATION + '/userPosts/' + id, options);
  }
}
