import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {
 constructor(public services:ChatService,private router:Router){}
 
 messages:any[]=[]
 inputMessage = ''
 @ViewChild ('Scroll') private scrollConteroller!:ElementRef
 loggedInUserName=sessionStorage.getItem('user')
 RoomName=sessionStorage.getItem('room')
  ngOnInit(): void {
    this.services.Messages.subscribe(res=>{
      this.messages=res
      console.log(this.messages)
    })
  }
  ngAfterViewChecked(): void {
    this.scrollConteroller.nativeElement.scrollTop=this.scrollConteroller.nativeElement.scrollHeight
  }
  sendMessages(){
    this.services.sendMessage(this.inputMessage)
    .then(()=>{
      this.inputMessage=''
    }).catch((err)=>{
      console.log(err)
    })
  }
  LeaveChat(){
    this.services.leave().then(()=>{
      this.router.navigate(["Welcome"])
      setTimeout(()=>{
        location.reload()
      },0)
    }).catch((err)=>{
      console.log(err)
    })
  }
}
