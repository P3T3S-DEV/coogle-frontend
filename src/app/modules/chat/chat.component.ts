import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/http/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public listMessages: string[] = [];
  public listDates: number[] = [];
  public listUsers: string[] = [];
  public actualUser: string;
  @ViewChild('inputMessage') private inputText!: ElementRef;
  
  constructor(
    private chatService: ChatService,
    private router: Router,){
    let user: string | null = localStorage.getItem('username');
    if (user!= null){
      this.actualUser = user;
    }else{
      this.actualUser = "Usuario inválido"
    }
  }

  ngOnInit(){
    this.chatService.listen('chat:message').subscribe((data: any)=>{
      console.log(data);
      this.listUsers.push(data.user);
      this.listDates.push(data.date);
      this.listMessages.push(data.message);
    })
  }
  
  submitMessage(){
    this.chatService.emit('chat:message', {
      user: `${this.actualUser}`,
      message: `${this.inputText.nativeElement.value}`,
      date: `${Date.now()}`
    });
    this.inputText.nativeElement.value = "";
  }

  validateActualUser(index: number): boolean{
    return this.actualUser != this.listUsers[index] ?  true :  false;
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/signin')
  }
}
