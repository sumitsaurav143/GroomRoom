import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;
  private readonly url: string = 'http://3.6.86.122/'; // Your server URL

  constructor() {
    this.socket = io(this.url);
  }

  connect(roomId:any,userName:string,userResponse:number) {
    this.socket.emit('joinRoom',{roomId: roomId, userName: userName, userResponse: userResponse});
  }

  submitUserResponse(roomId:any,userName:string,userResponse:number) {
    this.socket.emit('userResponse',{roomId: roomId, userName: userName, userResponse: userResponse});
  }

  getAllRooms(){
    return new Observable((observer) => {
      this.socket.on('allRooms', (rooms) => {
        console.log("getallrooms in service...", rooms)
        observer.next(rooms);
      });
    });
  }

  getRoomData() {
    return new Observable((observer)=>{
      this.socket.on('roomData',(data)=>{
        observer.next(data);
      })
    })
  }

  newJoinedPlayerInfo(){
    return new Observable((observer)=>{
      this.socket.on('joinRoom',(message)=>{
        observer.next(message);
      })
    })
   
  }

  // submitCard(value: number) {
  //   this.socket.emit('submitCard', { value: value });
  // }

  // getUpdatedResponses() {
  //   return new Observable((observer) => {
  //     this.socket.on('updateResponses', (responses) => {
  //       observer.next(responses);
  //     });
  //   });
  // }

  // showResult() {
  //   this.socket.emit('showResult');
  // }

  // getAverage() {
  //   return new Observable((observer) => {
  //     this.socket.on('showAverage', (average) => {
  //       observer.next(average);
  //     });
  //   });
  // }

}
