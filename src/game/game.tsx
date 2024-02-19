import Player from "./player";
import Board from "./board";

enum PlayerTurn {
  UNKNOWN,
  TOP,
  BOTTOM,
}

enum RoundSteps {
  ROLL_DICE,
  PLACE_DICE,
  END,
}

class Game {
  private playerTop: Player;
  private playerBottom: Player;
  private rolledDice: number;
  private currentPlayer: PlayerTurn;
  private roundStep: RoundSteps;

  constructor() {
    this.rolledDice = 0;
    this.roundStep = RoundSteps.ROLL_DICE;
    this.playerTop = new Player(new Board());
    this.playerBottom = new Player(new Board());
    this.currentPlayer =
      Math.random() < 0.5 ? PlayerTurn.TOP : PlayerTurn.BOTTOM;
  }

  public getPlayerTurn(): PlayerTurn {
    return this.currentPlayer;
  }

  public getRoundStep(): RoundSteps {
    return this.roundStep;
  }

  getPlayersDeath(): Map<PlayerTurn, number> {
    return new Map([
      [PlayerTurn.TOP, this.playerTop.getDeathCount()],
      [PlayerTurn.BOTTOM, this.playerBottom.getDeathCount()],
    ]);
  }

  getPlayersBoard(): Map<PlayerTurn, number[][]> {
    return new Map([
      [PlayerTurn.TOP, this.playerTop.getBoard().getBoard()],
      [PlayerTurn.BOTTOM, this.playerBottom.getBoard().getBoard()],
    ]);
  }

  getPlayersBoarPoints(): Map<PlayerTurn, number[]> {
    return new Map([
      [PlayerTurn.TOP, this.playerTop.getBoard().getScores()],
      [PlayerTurn.BOTTOM, this.playerBottom.getBoard().getScores()],
    ]);
  }

  getCanPlaceDice(): Map<PlayerTurn, boolean[]> {
    return new Map([
      [PlayerTurn.TOP, this.playerTop.getBoard().getPlaceableColumns()],
      [PlayerTurn.BOTTOM, this.playerBottom.getBoard().getPlaceableColumns()],
    ]);
  }

  public rollDice(player: PlayerTurn): number {
    if (player !== this.currentPlayer) {
      throw new Error(
        "Not your turn, you are " + player + " and it is " + this.currentPlayer
      );
    } else if (this.roundStep !== RoundSteps.ROLL_DICE) {
      throw new Error("Not the right step");
    }

    this.rolledDice = Math.floor(Math.random() * 6) + 1;
    this.roundStep = RoundSteps.PLACE_DICE;

    return this.rolledDice;
  }

  public getDiceValue(): number {
    return this.rolledDice;
  }

  public placeDice(player: PlayerTurn, column: number) {
    if (player !== this.currentPlayer) {
      throw new Error(
        "Not your turn, you are " + player + " and it is " + this.currentPlayer
      );
    } else if (this.roundStep !== RoundSteps.PLACE_DICE) {
      throw new Error("Not the right step");
    }

    const currentPlayer =
      player === PlayerTurn.TOP ? this.playerTop : this.playerBottom;
    const otherPlayer =
      player === PlayerTurn.TOP ? this.playerBottom : this.playerTop;

    currentPlayer.getBoard().placeOnColumn(column, this.rolledDice);
    otherPlayer.getBoard().removeColumnMatch(column, this.rolledDice);

    if (currentPlayer.getBoard().isFull()) {
      const topPlayerScore = this.playerTop.getBoard().getTotalScore();
      const bottomPlayerScore = this.playerBottom.getBoard().getTotalScore();

      if (topPlayerScore > bottomPlayerScore) {
        this.playerBottom.addDeath();
      } else if (topPlayerScore < bottomPlayerScore) {
        this.playerTop.addDeath();
      }

      if (this.playerTop.hasLost() || this.playerBottom.hasLost()) {
        this.roundStep = RoundSteps.END;
        return;
      }

      this.playerTop.getBoard().setBoard(new Board().getBoard());
      this.playerBottom.getBoard().setBoard(new Board().getBoard());
    }

    this.roundStep = RoundSteps.ROLL_DICE;
    this.currentPlayer =
      this.currentPlayer === PlayerTurn.TOP
        ? PlayerTurn.BOTTOM
        : PlayerTurn.TOP;
    console.log("player switch to "+ this.currentPlayer)

    return;
  }
}

export { Game, PlayerTurn, RoundSteps };
