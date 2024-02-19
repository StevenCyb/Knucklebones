class Board {
  private board: number[][];

  constructor() {
    this.board = Array.from({ length: 3 }, () => [0, 0, 0]);
  }

  public getBoard() : number[][] {
    return [...this.board.map(row => [...row])];
  }

  public setBoard(board: number[][]) {
    if (board.length !== 3) {
      throw new Error("Invalid board size");
    }

    for (let row = 0; row < 3; row++) {
      if (board[row].length !== 3) {
        throw new Error("Invalid board size");
      }

      for (let column = 0; column < 3; column++) {
        if (board[row][column] < 0 || board[row][column] > 6) {
          throw new Error("Invalid dice value");
        }
      }
    }

    this.board = board;
  }

  public canPlaceOnColumn(column: number): boolean {
    if (column < 0 || column > 2) {
      return false;
    }

    for (let row = 0; row < 3; row++) {
      if (this.board[row][column] === 0) {
        return true;
      }
    }

    return false;
  }

  public getPlaceableColumns(): boolean[] {
    const canPlaceDice = [false, false, false];

    for (let column = 0; column < 3; column++) {
      canPlaceDice[column] = this.canPlaceOnColumn(column);
    }

    return canPlaceDice;
  }

  public placeOnColumn(column: number, dice: number) {
    for (let row = 0; row < 3; row++) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = dice;

        return;
      }
    }

    throw new Error("Column is full");
  }

  public isFull(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (this.board[row][column] === 0) {
          return false;
        }
      }
    }

    return true;
  }

  public removeColumnMatch(column: number, dice: number) {
    for (let row = 0; row < 3; row++) {
      if (this.board[row][column] === dice) {
        for (let rowShift = row; rowShift < 2; rowShift++) {
          this.board[rowShift][column] = this.board[rowShift + 1][column];
        }

        this.board[2][column] = 0;
        row--;
      }
    }
  }

  public getScores(): number[] {
    const points = [0, 0, 0];

    for (let column = 0; column < 3; column++) {
      const dices = new Map<number, number>();

      for (let row = 0; row < 3; row++) {
        let diceCount = dices.get(this.board[row][column]) || 0;
        diceCount++;
        dices.set(this.board[row][column], diceCount);
      }

      for (let [dice, count] of dices as any) {
        if (count === 1) {
          points[column] += dice;
        } else if (count === 2) {
          points[column] += (dice + dice) * 2;
        } else if (count === 3) {
          points[column] += (dice + dice + dice) * 3;
        }
      }
    }

    return points;
  }

  public getTotalScore(): number {
    return this.getScores().reduce((acc, points) => acc + points, 0);
  }
}

export default Board;
