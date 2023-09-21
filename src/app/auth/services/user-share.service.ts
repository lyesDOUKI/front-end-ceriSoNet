import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserShareService {

  constructor() { }
  private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private user : User | undefined;
  setUser(user: User) {
    this.user = user
    this.userSubject.next(this.user);
  }

  getUser(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }
}
