import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './Components/join-room/join-room.component';
import { ChatComponent } from './Components/chat/chat.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Join-Room',
    pathMatch:'full'
  },
  {
  path:'Join-Room',
  component:JoinRoomComponent
 },
 {
  path:'Chat',
  component:ChatComponent
 },
 {
  path:'Welcome',
  component:WelcomeComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
