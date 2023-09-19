import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('login') login!: NgForm;

  info : any = {};
  private url = 'https://pedago.univ-avignon.fr:3205/';
  constructor(private http : HttpClient) { }

  onSubmit() {
    this.http.post(this.url + 'login', this.info).subscribe(res => {
      console.log(res);
    });
    
  }
}
