import {Move} from './move';

export class Game {

  inviteCode: string;
  hostName: string;
  players: string[];
  currentTurnPlayer: string;
  moves: Move[];
  started: boolean;

  constructor() {
    this.inviteCode = '';
    this.hostName = '';
    this.players = [];
    this.currentTurnPlayer = '';
    this.moves = [];
    this.started = false;
  }

}
