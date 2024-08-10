import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SocketioService } from 'src/app/socketio.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface UserResponse {
  username: string;
  value: number;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomId: string | null = '';
  username : string  = '';
  userResponse : any= null ;
  openRoomForUser=false;
  storyIds: number[] = [1, 2, 3, 4, 5]; 
  options: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 54, 88];
  roomPlayers: any=[];

  timer: number = 60;
  interval: any;
  fullUrl: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private location: Location, 
    private socketService: SocketioService, 
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

    // this.socketService.getUpdatedResponses().subscribe((responses: any) => {
    //   this.userResponses = responses;
    // });

    // this.socketService.getAverage().subscribe((average: any) => {
    //   this.average = average;
    // });
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this.interval);
    this.timer = 30;
    this.startTimer();
  }

  copyToClipboard(url: string): void {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
   // alert('URL copied to clipboard');
  }


  openRoom(){
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id');
    });
    this.socketService.connect(this.roomId, this.username, this.userResponse);
    this.newPlayerInfo();
    this.roomPlayerInfo();
    const activeUrl = this.router.url;
    this.fullUrl = `${window.location.protocol}//${window.location.host}${this.location.prepareExternalUrl(activeUrl)}`;
    this.startTimer();
    this.openRoomForUser=true;
  }

  submitResponse(selectedOption:number){
    this.userResponse=selectedOption;
    this.socketService.submitUserResponse(this.roomId, this.username, selectedOption);
  }

  usernameProvided(){
    return this.username==='';
  }


  newPlayerInfo() {
    this.socketService.newJoinedPlayerInfo().subscribe((notification:any) => {
      this.snackBar.open(notification,'',{
        duration:3000
      })
    })
  }

  roomPlayerInfo() {
    this.socketService.getRoomData().subscribe((data:any) => {
      this.roomPlayers=data;
      console.log("ROOM DATA:: ",data);
    })
  }

  // submitCard() {
  //   this.socketService.submitCard(this.value);
  // }

  // showResult() {
  //   this.socketService.showResult();
  // }


}