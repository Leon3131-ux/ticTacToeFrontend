import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../classes/game';
import {GameService} from '../../services/game.service';
import {AuthService} from '../../services/auth.service';
import {ActiveGameErrorHandler} from '../../errorHandler/active-game-error- handler';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private websocketService: WebsocketService,
              private route: ActivatedRoute,
              private router: Router,
              private gameService: GameService,
              public authService: AuthService,
              private activeGameErrorHandler: ActiveGameErrorHandler,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.websocketService.unsubscribeAll().subscribe(() => {
        this.websocketService.subscribe('/join/' + params['inviteCode']).subscribe(usernameDto => {
          this.handlePlayerJoin(usernameDto.username)
        });
        this.websocketService.subscribe('/launch/' + params['inviteCode']).subscribe(() => {
          this.router.navigate(['/game'], {queryParams: {inviteCode: this.game.inviteCode}});
        })
        this.websocketService.subscribe('/leave/' + params['inviteCode']).subscribe(usernameDto => {
          this.handlePlayerLeave(usernameDto.username);
        })
      })
    })
    this.gameService.getActiveGame(this.activeGameErrorHandler).subscribe(game => {
        if(game.started){
          this.router.navigate(['/game'], {queryParams: {inviteCode: game.inviteCode}});
        }else {
          this.game = game;
        }
    },
      () => {})
  }

  game: Game = new Game();

  leave(){
    this.gameService.leaveGame().subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  start(){
    this.gameService.startGame().subscribe(() => {
      this.router.navigate(['/game'], {queryParams: {inviteCode: this.game.inviteCode}});
    },
      () =>{})
  }

  private handlePlayerLeave(username: string){
    if(username === this.game.hostName){
      this.router.navigate(['/home']);
      this.messageService.add({
        severity: 'warn',
        summary: 'Game stopped',
        detail: 'The host has left',
        life: 3000
      });
    }else {
      let index = this.game.players.indexOf(username);
      this.game.players.splice(index, 1);
      this.messageService.add({
        severity: 'warn',
        summary: 'Someone left',
        detail: 'Player ' + username + ' ,has left',
        life: 3000
      });
    }
  }

  private handlePlayerJoin(username: string){
    this.messageService.add({
      severity: 'success',
      summary: 'Someone Joined',
      detail: 'Player: ' + username + ' ,has joined',
      life: 3000
    });
    this.game.players.push(username);
  }

}
