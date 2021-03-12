import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGuard } from 'src/app/guards/chat/chat.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [ChatGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
