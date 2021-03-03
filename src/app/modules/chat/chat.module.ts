import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from 'src/app/http/chat.service';
import { ChatComponent } from './chat.component';
import { CoreModule } from '../core/core.module';
import { ChatGuard } from './guard/chat.guard';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    CoreModule
  ],
  providers: [
    ChatService,
    ChatGuard
  ]
})
export class ChatModule { }
