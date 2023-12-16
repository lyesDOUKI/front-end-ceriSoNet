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
    
    
    socket.on('firstConnect', (message) => {
      
    });
  }
}
