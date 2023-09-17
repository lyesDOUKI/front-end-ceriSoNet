import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'ceri-so-net';
  ngOnInit(): void {
    console.log("Hello World!");
    console.log("le serveur est sur le port : ", window.location.port);
  }
}
