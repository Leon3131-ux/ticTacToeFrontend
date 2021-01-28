export class Cell {

  x: number;
  y: number;
  owner: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.owner = null;
  }

}
