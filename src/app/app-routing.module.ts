import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: "home",
    loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: "chat",
    loadChildren: ()=> import('./modules/chat/chat.module').then(m => m.ChatModule)
  },
  { 
    path: "auth",
    loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
