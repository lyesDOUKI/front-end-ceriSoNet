import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'ceri-so-net';
  ngOnInit(): void {
    const socket = io(environment.URI_NODE_API);
    console.log("Hello World!");
    console.log("le serveur est sur le port : ", window.location.port);
    socket.on('notify', (message) => {
      console.log(message);
    });
  }
}
