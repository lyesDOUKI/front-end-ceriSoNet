import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {User } from '../models/user';
import {environment} from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI_NODE_API = environment.URI_NODE_API;

  constructor(private http : HttpClient) { }

  login(username : string, password : string) {
    const dataToSend = {username: username, password: password};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe : 'response' as 'response'
    };
    return this.http.post<HttpResponse<User>>(this.URI_NODE_API + 'login', dataToSend, options);
  }
}
