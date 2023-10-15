import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private URI_NODE_API = environment.URI_NODE_API;

  private publicationsSubject: BehaviorSubject<Publication[] | null> = new BehaviorSubject<Publication[] | null>([]);
  public publications$: Observable<Publication[] | null> = this.publicationsSubject.asObservable();

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
}
