import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/socketio.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rooms: any = {};
  fullUrl : any;

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5','Item 3', 'Item 4', 'Item 5'];
  rows: any[] = [];


  chunk(arr: any[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  constructor(private socketioService: SocketioService, private route:Router) {}

  ngOnInit() {
    console.log("home allroom");
    this.rows = this.chunk(this.items, 3);
    this.socketioService.getAllRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log("home allroom:", this.rooms);
    });
    this.fullUrl = `${window.location.protocol}//${window.location.host}`;
  }


  createRoom(){
    const id=uuidv4().split('-')[0];
    sessionStorage.setItem('RoomId',id);
    this.route.navigate(['/room',id]);
  }

  getRoomKeys(): string[] {
    return Object.keys(this.rooms);
  }

}
