import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from 'src/app/http/chat/chat.service';
import { ChatComponent } from './chat.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { CoreModule } from '../core/core.module';
import { YoutubeService } from 'src/app/http/youtube/youtube.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LateralbarComponent } from './components/lateralbar/lateralbar.component';


@NgModule({
  declarations: [ChatComponent, YoutubeComponent, LateralbarComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  providers: [
    ChatService,
    YoutubeService
  ]
})
export class ChatModule { }
