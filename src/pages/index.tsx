import React from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import DiceIcon from "@/components/dice";
import OverlayView from "@/components/overlay_view";
import EndGame from "@/components/end_game_view";
import RulesView from "@/components/rules_view";
import RollDiceView from "@/components/roll_dice_view";
import BoardComponent from "@/components/board";
import { StartGame, OpponentType } from "@/components/start_game";
import { Game, PlayerTurn, RoundSteps } from "@/game/game";
import {
  Controller,
  HumanController,
  StupidNpcController,
} from "@/game/controller";

const inter = Inter({ subsets: ["latin"] });

class PlayerStatus {
  deathCount: number;
  pointCounter: number[];
  board: number[][];

  constructor() {
    this.deathCount = 0;
    this.pointCounter = Array(3).fill(0);
    this.board = Array(3).fill(Array(3).fill(0));
  }
}

class GameStatus {
  showNewGame: boolean;
  showEndGame: boolean;
  showRules: boolean;
  showRollDice: boolean;
  canRollDice: boolean;
  opponentType: OpponentType;
  roundStep: RoundSteps;
  playerTurn: PlayerTurn;
  playerTop: PlayerStatus;
  playerBottom: PlayerStatus;

  constructor(roundStep: RoundSteps, playerTurn: PlayerTurn) {
    this.showNewGame = true;
    this.showEndGame = false;
    this.showRules = false;
    this.showRollDice = false;
    this.canRollDice = false;
    this.opponentType = OpponentType.UNKNOWN;
    this.roundStep = roundStep;
    this.playerTurn = playerTurn;
    this.playerTop = new PlayerStatus();
    this.playerBottom = new PlayerStatus();
  }
}

class Home extends React.Component {
  state: GameStatus;
  game: Game;
  topPlayerController?: Controller;
  bottomPlayerController?: Controller;
  currentController?: Controller;

  constructor(props: any) {
    super(props);
    this.game = new Game();
    this.state = new GameStatus(RoundSteps.ROLL_DICE, PlayerTurn.UNKNOWN);
  }

  update() {
    const newState = this.state;

    newState.showEndGame = this.game.getRoundStep() == RoundSteps.END;
    newState.canRollDice =
      this.game.getRoundStep() == RoundSteps.ROLL_DICE &&
      (newState.opponentType == OpponentType.HUMAN ||
        this.game.getPlayerTurn() == PlayerTurn.BOTTOM);

    newState.roundStep = this.game.getRoundStep();
    newState.playerTurn = this.game.getPlayerTurn();

    if (newState.playerTurn == PlayerTurn.TOP) {
      this.currentController = this.topPlayerController;
    } else {
      this.currentController = this.bottomPlayerController;
    }

    const playerDeathCount = this.game.getPlayersDeath();
    newState.playerTop.deathCount = playerDeathCount.get(PlayerTurn.TOP) || 0;
    newState.playerBottom.deathCount =
      playerDeathCount.get(PlayerTurn.BOTTOM) || 0;

    const playerPointCounter = this.game.getPlayersBoarPoints();
    newState.playerTop.pointCounter = playerPointCounter.get(
      PlayerTurn.TOP
    ) || [0, 0, 0];
    newState.playerBottom.pointCounter = playerPointCounter.get(
      PlayerTurn.BOTTOM
    ) || [0, 0, 0];

    const playerBoard = this.game.getPlayersBoard();
    newState.playerTop.board = playerBoard.get(PlayerTurn.TOP) || [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    newState.playerBottom.board = playerBoard.get(PlayerTurn.BOTTOM) || [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.setState(newState);

    if (
      this.state.opponentType != OpponentType.HUMAN &&
      this.state.opponentType != OpponentType.UNKNOWN &&
      this.game.getPlayerTurn() == PlayerTurn.TOP &&
      this.game.getRoundStep() == RoundSteps.ROLL_DICE
    ) {
      setTimeout(() => {
        this.topPlayerController?.Roll();
        setTimeout(() => {
          this.topPlayerController?.Place(-1);
          setTimeout(() => {
            this.update();
          }, 500);
        }, 500);
      }, 500);
    }
  }

  render() {
    return (
      <>
        <div className={`${inter.className}`}>
          <div className="action_button_wrapper top">
            <button
              onClick={() => {
                this.setState({ showRules: true });
              }}
            >
              ?
            </button>
          </div>
          {this.state.canRollDice && (
            <div className="action_button_wrapper bottom">
              <button
                onClick={() => {
                  this.setState({ showRollDice: true });
                }}
              >
                ⠿
              </button>
            </div>
          )}

          {this.state.showNewGame && (
            <div className="overlay">
              <OverlayView>
                <StartGame
                  startNewGame={(opponent: OpponentType) => {
                    this.bottomPlayerController = new HumanController(
                      this.game,
                      PlayerTurn.BOTTOM
                    );

                    if (opponent == OpponentType.HUMAN) {
                      this.topPlayerController = new HumanController(
                        this.game,
                        PlayerTurn.TOP
                      );
                    } else if (opponent == OpponentType.STUPID_NPC) {
                      this.topPlayerController = new StupidNpcController(
                        this.game,
                        PlayerTurn.TOP
                      );
                    }

                    this.update();
                    this.setState({
                      showNewGame: false,
                      opponentType: opponent,
                    });
                  }}
                />
              </OverlayView>
            </div>
          )}
          {this.state.showEndGame && (
            <div className="overlay">
              <OverlayView>
                <EndGame
                  againstNPC={this.state.opponentType != OpponentType.HUMAN}
                  playerTopDeathCounter={this.state.playerTop.deathCount}
                  playerBottomDeathCounter={this.state.playerBottom.deathCount}
                />
              </OverlayView>
            </div>
          )}
          {this.state.showRules && (
            <div className="overlay">
              <OverlayView
                closeHandler={() => {
                  this.setState({ showRules: false });
                }}
              >
                <RulesView />
              </OverlayView>
            </div>
          )}
          {this.state.showRollDice && (
            <div className="overlay">
              <OverlayView>
                <RollDiceView
                  closeHandler={() => {
                    this.update();
                    setTimeout(() => {
                      this.setState({ showRollDice: false });
                    }, 100);
                  }}
                  roll={() => {
                    return this.currentController?.Roll() || 1;
                  }}
                />
              </OverlayView>
            </div>
          )}
        </div>

        <div className={`${styles.main} ${inter.className} main`}>
          <div className="game_wrapper">
            <div className="score_wrapper">
              <div
                className={`player_score_board ${
                  this.state.playerTurn === PlayerTurn.TOP ? "active" : ""
                }`}
                key={PlayerTurn.TOP}
              >
                <DiceIcon
                  value={this.state.playerTop.deathCount >= 3 ? 7 : 0}
                />
                <div className="counter dead">3</div>
                <DiceIcon
                  value={this.state.playerTop.deathCount >= 2 ? 7 : 0}
                />
                <div className="counter">2</div>
                <DiceIcon
                  value={this.state.playerTop.deathCount >= 1 ? 7 : 0}
                />
                <div className="counter">1</div>
              </div>

              <div
                className={`player_score_board ${
                  this.state.playerTurn === PlayerTurn.BOTTOM ? "active" : ""
                }`}
                key={PlayerTurn.BOTTOM}
              >
                <DiceIcon
                  value={this.state.playerBottom.deathCount >= 1 ? 7 : 0}
                />
                <div className="counter">1</div>
                <DiceIcon
                  value={this.state.playerBottom.deathCount >= 2 ? 7 : 0}
                />
                <div className="counter">2</div>
                <DiceIcon
                  value={this.state.playerBottom.deathCount >= 3 ? 7 : 0}
                />
                <div className="counter dead">3</div>
              </div>
            </div>

            <div className="spacer" />

            <div className="board_wrapper">
              <BoardComponent
                playerPosition={PlayerTurn.TOP}
                canPlaceDice={
                  this.game.getRoundStep() === RoundSteps.PLACE_DICE &&
                  this.game.getPlayerTurn() === PlayerTurn.TOP
                }
                points={this.state.playerTop.pointCounter}
                placableDiceValue={this.game.getDiceValue()}
                board={this.state.playerTop.board}
                onClick={(column) => {
                  this.currentController?.Place(column);
                  this.update();
                }}
              />

              <div className="spacer" />

              <BoardComponent
                playerPosition={PlayerTurn.BOTTOM}
                canPlaceDice={
                  this.game.getRoundStep() === RoundSteps.PLACE_DICE &&
                  this.game.getPlayerTurn() === PlayerTurn.BOTTOM
                }
                points={this.state.playerBottom.pointCounter}
                placableDiceValue={this.game.getDiceValue()}
                board={this.state.playerBottom.board}
                onClick={(column) => {
                  this.currentController?.Place(column);
                  this.update();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
