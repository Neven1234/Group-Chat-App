import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //baseurl:any=environment.baseUrl;
  public connection:signalR.HubConnection=new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7092/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();
  public Messages=new BehaviorSubject<any>([]);
  public ConnectedUsers=new BehaviorSubject<string[]>([]);
  public messages:any[]=[]
  public users:string[]=[]

  constructor() { 
    this.satrt()
    this.connection.on("ReciveMessage",(user:string, message:string, MessageTime:string)=>{
      console.log('user :',user)
      console.log('message :',message)
      console.log('message time :',MessageTime)
      this.messages=[...this.messages,{user,message,MessageTime}]
      this.Messages.next(this.messages)
    });
    this.connection.on("connected users",(users:any)=>{
      console.log('users :',users)
      this.ConnectedUsers.next(users)
    })
  }
  //start connection
  public async satrt(){
    try{
      await this.connection.start()
    }
    catch(error){
      console.log(error)
     
    }
  }
  //join room
  public async joinRoom(user:string,room : string){
    this.connection.invoke("JoinRoom",{user,room})
  }
  //send messages
  public async sendMessage(messages:string)
  {
    this.connection.invoke("SendMessage",messages)
  }
  //leave chat
  public async leave(){
    return this.connection.stop();
  }
}
