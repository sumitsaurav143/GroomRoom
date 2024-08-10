import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RoomComponent } from './Components/room/room.component';
import { NotFoundComponent } from './Components/404/404.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'room/:id',component:RoomComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
