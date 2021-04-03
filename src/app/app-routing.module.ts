import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { NotesModule } from './modules/notes/notes.module';

const routes: Routes = [
  { 
    path: "home",
    loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: "chat",
    loadChildren: ()=> import('./modules/chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGuard]
  },
  { 
    path: "auth",
    loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "notes",
    loadChildren: ()=> import('./modules/notes/notes.module').then(m => NotesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full' 
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
