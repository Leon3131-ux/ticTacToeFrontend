import { Component, OnInit } from '@angular/core';
import {Cell} from '../../classes/cell';
import {Row} from '../../classes/row';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';
import {GameService} from '../../services/game.service';
import {AuthService} from '../../services/auth.service';
import {Move} from '../../classes/move';
import {Game} from '../../classes/game';
import {ActiveGameErrorHandler} from '../../errorHandler/active-game-error- handler';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private websocketService: WebsocketService,
              private gameService: GameService,
              public authService: AuthService,
              private activeGameErrorHandler: ActiveGameErrorHandler,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.rows = this.createRows();
    this.gameService.getActiveGame(this.activeGameErrorHandler).subscribe(game => {
      this.game = game;
      this.handleCurrentTurn(game.currentTurnPlayer);
      this.initMoves(game.moves);
    }, () => {})
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.websocketService.subscribe('/move/' + params['inviteCode']).subscribe(move => {
        this.handleMove(move);
      })
      this.websocketService.subscribe('/currentTurn/' + params['inviteCode']).subscribe(usernameDto => {
        this.handleCurrentTurn(usernameDto.username);
      })
      this.websocketService.subscribe('/leave/' + params['inviteCode']).subscribe(usernameDto => {
        this.handlePlayerLeave(usernameDto.username);
      })
      this.websocketService.subscribe('/win/' + params['inviteCode']).subscribe(winDto => {
        if(winDto.winner){
          this.winStatus = winDto.winner;
        }
        if(winDto.draw){
          this.winStatus = 'draw';
        }
      })
    })

  }

  winStatus: string;
  currentTurn: boolean;
  game: Game = new Game();
  rows: Row[]
  queryParams: Params;

  createRows(): Row[]{
    let rows: Row[] = [];
    for (let y = 0; y <= 2; y++){
      let cells: Cell[] = [];
      for(let x = 0; x <= 2; x++){
        cells.push(new Cell(x, y));
      }
      rows.push(new Row(cells))
    }
    return rows;
  }

  handleMove(move: Move){
    let row = this.rows[move.y];
    let cell = row.cells[move.x];
    cell.owner = move.username;
  }

  makeMove(cell: Cell){
    if(this.currentTurn && cell.owner === null && !this.winStatus){
      this.gameService.makeMove(cell.x, cell.y).subscribe(() => {});
    }
  }

  private handleCurrentTurn(currentTurn: string){
    this.currentTurn = currentTurn === this.authService.getUsername();
  }

  private initMoves(moves: Move[]){
    for (let move of moves){
      this.handleMove(move);
    }
  }

  private handlePlayerLeave(username: string){
    this.websocketService.unsubscribeAll();
      this.router.navigate(['/home']);
      this.messageService.add({
        severity: 'warn',
        summary: 'Game stopped',
        detail: 'Player ' + username + ' has left',
        life: 3000
      });
  }

  leave(){
    if(!this.winStatus){
      this.gameService.leaveGame().subscribe(() => {
        this.websocketService.unsubscribeAll();
        this.router.navigate(['/home']);
      })
    }else {
      this.websocketService.unsubscribeAll();
      this.router.navigate(['/home']);
    }
  }
}
