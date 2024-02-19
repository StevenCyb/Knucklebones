import Board from "./board";

class Player {
  private board: Board;
  private deathCount: number;

  constructor(board: Board) {
    this.board = board;
    this.deathCount = 0;
  }

  public getBoard(): Board {
    return this.board;
  }

  public addDeath() {
    if (this.deathCount >= 3) {
      throw new Error("You can't die more than 3 times");
    }

    this.deathCount++;
  }

  public getDeathCount(): number {
    return this.deathCount;
  }

  public hasLost(): boolean {
    return this.deathCount >= 3;
  }
}

export default Player;
