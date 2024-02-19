import { PlayerTurn } from "@/game/game";
import DiceIcon from "./dice";

interface EndGameProps {
  playerPosition: PlayerTurn;
  canPlaceDice: boolean;
  placableDiceValue: number;
  board: number[][];
  points: number[];
  onClick: (column: number) => void;
}

class BoardCell {
  row: number;
  column: number;
  value: number;
  isPlaceholder: boolean;
  isGlow: boolean;
  onClickCallback?: (column: number) => void;

  constructor(row: number, column: number, value: number) {
    this.row = row;
    this.column = column;
    this.value = value;
    this.isPlaceholder = false;
    this.isGlow = false;
  }

  onClick() {
    if (this.onClickCallback) {
      this.onClickCallback(this.column);
    }
  }
}

export default function BoardComponent(props: EndGameProps) {
  const board = Array.from({ length: 3 }, () => [
    new BoardCell(0, 0, 0),
    new BoardCell(0, 0, 0),
    new BoardCell(0, 0, 0),
  ]);
  const columnPlaceholder = [false, false, false];
  const isFull = [true, true, true];
  const glowMap = [new Map<number, number>(),new Map<number, number>(),new Map<number, number>()];

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      const cell = new BoardCell(row, column, props.board[row][column]);

      if (cell.value === 0) {
        isFull[column] = false;
        if (
          props.placableDiceValue !== 0 &&
          props.canPlaceDice &&
          !columnPlaceholder[column]
        ) {
          columnPlaceholder[column] = !false;
          cell.value = props.placableDiceValue;
          cell.isPlaceholder = true;
        }
      } else {
        glowMap[column].set(cell.value, (glowMap[column].get(cell.value) || 0) + 1);
      }

      if (props.playerPosition === PlayerTurn.TOP) {
        board[2 - row][column] = cell;
      } else {
        board[row][column] = cell;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (props.canPlaceDice && !isFull[column]) {
        board[row][column].onClickCallback = props.onClick;
      }

      if ((glowMap[column].get(board[row][column].value) || 1) > 1) {
        board[row][column].isGlow = true;
      }
    }
  }

  return (
    <div className="player_board">
      { 
        props.playerPosition === PlayerTurn.BOTTOM &&
        props.points.map((point, index) => (
          <span className="score" key={index}>
            {point}
          </span>
        ))
      }
      {board.map((rows, rowIndex) =>
        rows.map((cell, columnIndex) => (
          <DiceIcon
            key={rowIndex + "/" + columnIndex}
            value={cell.value}
            glow={cell.isGlow}
            placeholder={cell.isPlaceholder}
            onClick={cell.onClick.bind(cell)}
          />
        ))
      )}
      { 
        props.playerPosition === PlayerTurn.TOP &&
        props.points.map((point, index) => (
          <span className="score" key={index}>
            {point}
          </span>
        ))
      }
    </div>
  );
}
