import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../chat.service';


@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private services:ChatService){}
 
  ngOnInit(): void {
    this.joinRoomForm=this.fb.group({
      user:['',Validators.required],
      room:['',Validators.required]
     })
  }
  JoinRoom()
  {
   const{user,room}=this.joinRoomForm.value;
   sessionStorage.setItem('user',user)
   sessionStorage.setItem('room',room)
   this.services.joinRoom(user,room)
   .then(()=>{
    this.router.navigate(['Chat'])

   }).catch((err)=>{
    console.log(err)
   })
    
  }
 
}