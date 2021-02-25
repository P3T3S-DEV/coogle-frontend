import { Component, OnInit } from '@angular/core';
import { ChatService } from './http/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'coogle-frontend';

  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.listen('test').subscribe((data)=>{
      console.log(data);
    })

    this.chatService.emit('message', "datica enviada");
  }
}
