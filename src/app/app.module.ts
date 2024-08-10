import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './Components/room/room.component';
import { HomeComponent } from './Components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './Components/404/404.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
