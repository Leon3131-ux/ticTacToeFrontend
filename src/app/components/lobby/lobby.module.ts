import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LobbyComponent} from './lobby.component';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class LobbyModule { }
