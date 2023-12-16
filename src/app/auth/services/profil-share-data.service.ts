import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { BehaviorSubject,Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfiLShareDataService {
  
  private formSubmitSubject = new Subject<void>();

  formSubmit = this.formSubmitSubject.asObservable();

  triggerFormSubmit() {
    this.formSubmitSubject.next();
    
  }
  constructor() { }
  private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private user : User | undefined;
  private identifantSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private identifiant : string | undefined;
  setUser(user: User | undefined) {
    this.user = user
    this.userSubject.next(this.user);
  }

  getUser(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }
  getUserObject(): User | undefined {
    return this.user;
  }
  setIdentifiant(identifiant: string | undefined) {
    this.identifiant = identifiant
    this.identifantSubject.next(this.identifiant);
  }

  getIdentifiant(): Observable<string | undefined> {
    return this.identifantSubject.asObservable();
  }
  
}
