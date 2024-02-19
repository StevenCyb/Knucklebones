export enum OpponentType {
  UNKNOWN,
  HUMAN,
  STUPID_NPC,
}

interface StartGameProps {
  startNewGame: (opponent: OpponentType) => void;
}

export const StartGame = (props: StartGameProps) => {
  return (
    <div className="start_game">
      <h1>Start new game</h1>
      <h3>Choose you&apos;r opponent:</h3>
      <button onClick={() => props.startNewGame(OpponentType.HUMAN)}>
        Human
      </button>
      <button onClick={() => props.startNewGame(OpponentType.STUPID_NPC)}>
        Stupid NPC
      </button>
    </div>
  );
};
