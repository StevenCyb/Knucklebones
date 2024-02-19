interface EndGameProps {
  playerTopDeathCounter: number;
  playerBottomDeathCounter: number;
  againstNPC?: boolean;
}

export default function EndGame(props: EndGameProps) {
  return (
    <div className="end_game">
      <h1>Game ends</h1>
      <p>Top-Player death count: {props.playerTopDeathCounter}</p>
      <p>Bottom-Player death count: {props.playerBottomDeathCounter}</p>
      <h2>
        {props.againstNPC
          ? props.playerTopDeathCounter > props.playerBottomDeathCounter
            ? "You win!"
            : "You lose!"
          : props.playerTopDeathCounter > props.playerBottomDeathCounter
          ? "Bottom-Player win!"
          : "Top-Player win!"}
      </h2>
      <button onClick={() => window.location.reload()}>&#x21bb;</button>
    </div>
  );
}
