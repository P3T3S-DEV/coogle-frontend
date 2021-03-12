import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;
  readonly uri: string = 'ws://localhost:3001'
  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string){
    return new Observable((suscriber)=>{
      this.socket.on(eventName, (data: any)=>{
        suscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }
}
