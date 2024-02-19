import Board from "./board";
import { Game, PlayerTurn } from "./game";

interface Controller {
  game: Game;
  onTurn: PlayerTurn;

  Roll(): number;
  Place(column: number): void;
}

class HumanController implements Controller {
  game: Game;
  onTurn: PlayerTurn;

  constructor(game: Game, onTurn: PlayerTurn) {
    this.game = game;
    this.onTurn = onTurn;
  }

  Roll(): number {
    return this.game.rollDice(this.onTurn);
  }

  Place(column: number): void {
    this.game.placeDice(this.onTurn, column);
  }
}

class StupidNpcController implements Controller {
  game: Game;
  onTurn: PlayerTurn;

  constructor(game: Game, onTurn: PlayerTurn) {
    this.game = game;
    this.onTurn = onTurn;
  }

  Roll(): number {
    console.log("NPC [" + this.onTurn + "] is rolling");
    const diceValue = this.game.rollDice(this.onTurn);
    console.log("NPC [" + this.onTurn + "] rolled " + diceValue);
    return diceValue;
  }

  Place(_: number): void {
    const diceValue = this.game.getDiceValue();
    const boards = this.game.getPlayersBoard();
    const ownBoard = new Board();
    ownBoard.setBoard(boards.get(this.onTurn) || []);
    let placeColumn = -1;

    const placeableColumns = Array<number>();
    ownBoard.getPlaceableColumns().forEach((placeable, column) => {
      if (placeable) {
        placeableColumns.push(column);

        for (let row = 0; row < 3; row++) {
          if (diceValue == ownBoard.getBoard()[row][column]) {
            placeColumn = column;
            return;
          }
        }
      }
    });

    if (placeColumn === -1) {
      placeColumn =
        placeableColumns[Math.floor(Math.random() * placeableColumns.length)];
    }

    console.log(
      "NPC [" + this.onTurn + "] place dice " + diceValue + " on " + placeColumn
    );
    this.game.placeDice(this.onTurn, placeColumn);

    return;
  }
}

export type { Controller };
export { HumanController, StupidNpcController };
