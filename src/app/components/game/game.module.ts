import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameComponent} from './game.component';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [GameComponent],
    imports: [
        CommonModule,
        ButtonModule,
    ],
})
export class GameModule { }
