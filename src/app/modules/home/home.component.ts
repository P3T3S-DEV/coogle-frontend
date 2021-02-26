import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/http/chat.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  public listMessages: string[] = [];
  @ViewChild('inputMessage') private inputText!: ElementRef;
  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.listen('server:message').subscribe((data: any)=>{
      console.log(data);
      this.listMessages.push(data);
    })
  }

  submitMessage(){
    this.chatService.emit('client:message', this.inputText.nativeElement.value);
    this.inputText.nativeElement.value = "";
  }
}
