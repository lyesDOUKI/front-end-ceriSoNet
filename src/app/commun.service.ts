import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Publication } from './contenu/models/publication';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor() { }
  listesDesPublications: Publication[] | null | undefined = [];
  private listesDesPublicationsSubject =  new Subject<any>();
  setlistesDesPublications(data: any) {
    this.listesDesPublications = data;
    this.listesDesPublicationsSubject.next(data);
  }

  getlistesDesPublications() {
    return this.listesDesPublications;
  }
  observeData()
  {
    return this.listesDesPublicationsSubject.asObservable();
  }
}
