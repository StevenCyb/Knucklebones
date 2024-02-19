import { useState } from "react";
import DiceIcon from "./dice";

interface RollDiceViewProps {
  closeHandler: () => void;
  roll: () => number;
}

export default function RollDiceView(props: RollDiceViewProps) {
  const [diceValue, setDiceValue] = useState(0);
  const [isDiceRolled, setIsDiceRolled] = useState(false); // Add new state variable

  const rollDice = () => {
    if (isDiceRolled) {
      return; // Do nothing if dice has already been rolled
    }

    let minDiceEffects = Math.floor(Math.random() * 10) + 5;

    const diceRollEffect = () => {
      const effectDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(effectDiceValue);
      minDiceEffects--;

      if (diceValue !== -1 && minDiceEffects <= 0) {
        setDiceValue(props.roll());
        setTimeout(() => {
          if (props.closeHandler) {
            props.closeHandler();
          }
        }, 1000);
        
        return;
      }

      setTimeout(() => {diceRollEffect()}, 250);
    }

    diceRollEffect();
    setIsDiceRolled(true); // Set isDiceRolled to true after the first click
  };

  return (
    <div className="dice_roll">
      <h1>Roll the dice</h1>
      <p>Click the dice to roll.</p>
      <div className={`dice_wrapper ${isDiceRolled ? 'disabled' : ''}`} onClick={rollDice}>
        <DiceIcon value={diceValue} />
      </div>
    </div>
  );
}
