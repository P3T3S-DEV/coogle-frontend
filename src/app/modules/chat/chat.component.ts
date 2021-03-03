import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/http/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public listMessages: string[] = [];
  public date: number = 0;
  @ViewChild('inputMessage') private inputText!: ElementRef;
  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.listen('chat:message').subscribe((data: any)=>{
      console.log(data);
      this.listMessages.push(data);
    })
  }
  
  submitMessage(){
    this.date = Date.now();
    this.chatService.emit('chat:message', `${this.inputText.nativeElement.value}`);
    this.inputText.nativeElement.value = "";
  }
}
