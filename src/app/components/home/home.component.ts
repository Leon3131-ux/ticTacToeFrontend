import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {DoNothingErrorHandler} from '../../errorHandler/do-nothing-error-handler';
import {AuthService} from '../../services/auth.service';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router,
              private doNothingErrorHandler: DoNothingErrorHandler,
              private authService: AuthService,
              private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.gameService.getActiveGame(this.doNothingErrorHandler).subscribe(game => {
      if(game.started){
        this.webSocketService.unsubscribeAll().subscribe(() => {
          this.router.navigate(['/game'], {queryParams: {inviteCode: game.inviteCode}});
        })
      }else {
        this.webSocketService.unsubscribeAll().subscribe(() => {
          this.router.navigate(['/lobby'], {queryParams: {inviteCode: game.inviteCode}});
        })
      }
    },
      () => {})
  }

  joinGameForm = new FormGroup({
      inviteCode: new FormControl()
    }
  )

  createGame(): void{
    this.gameService.createGame().subscribe(game => {
      this.webSocketService.unsubscribeAll().subscribe(() => {
        this.router.navigate(['/lobby'], {queryParams: {inviteCode: game.inviteCode}});
      })
    })
  }

  joinGame(): void{
    this.gameService.joinGame(this.joinGameForm.getRawValue().inviteCode).subscribe(game => {
      this.webSocketService.unsubscribeAll().subscribe(() => {
        this.router.navigate(['/lobby'], {queryParams: {inviteCode: game.inviteCode}});
      })
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
