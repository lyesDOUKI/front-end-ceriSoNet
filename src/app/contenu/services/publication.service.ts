import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import { Publication } from '../models/publication';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private URI_NODE_API = environment.URI_NODE_API;

  constructor(private http : HttpClient) { }

  getPublications() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response',
      withCredentials: true
    };
    return this.http.get<Publication[]>(this.URI_NODE_API + '/publication', options);
  }
}
