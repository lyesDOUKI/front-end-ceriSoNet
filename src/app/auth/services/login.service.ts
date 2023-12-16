import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {User } from '../models/user';
import {environment} from '../../../environments/environment.development';
import { Publication } from 'src/app/contenu/models/publication';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI_NODE_API = environment.URI_NODE_API;
  private LOGIN = '/login';
  private PUBLICATION = '/publication';
  constructor(private http : HttpClient) { }

  login(username : string, password : string) {
    const dataToSend = {username: username, password: password};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response',
      withCredentials: true
    };
    return this.http.post<HttpResponse<User>>(this.URI_NODE_API + this.LOGIN, dataToSend, options);
  }
  logout()
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response',
      withCredentials: true
    };
    return this.http.post(this.URI_NODE_API + this.LOGIN + '/logout',{}, options);
  }
  //subject of string 
  usersOn()
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response',
      withCredentials: true
    };
    return this.http.get<string []>(this.URI_NODE_API + this.LOGIN + '/usersOn', options);
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
