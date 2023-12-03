import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Publication } from './contenu/models/publication';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor() { }
  sharedData: Publication[] | null | undefined = [];
  private sharedDataSubject =  new Subject<any>();
  setSharedData(data: any) {
    this.sharedData = data;
    this.sharedDataSubject.next(data);
  }

  getSharedData() {
    return this.sharedData;
  }
  observeData()
  {
    return this.sharedDataSubject.asObservable();
  }
}
