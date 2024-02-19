import DiceIcon from "./dice";

export default function RulesView() {
  return (
    <>
      <div className="rules">
        <h1>Rules</h1>
        <h2>How to play</h2>
        <p>Your score is calculated by adding all dices together.</p>
        <h2>Destroy opponents</h2>
        <p>
          Destroy your opponent&apos;s dice by matching your dice on the same
          column to theirs.
        </p>
        <table>
          <tbody>
            <tr>
              <td style={{ borderBottom: "solid 1px #8c2f39" }}>
                <DiceIcon value={6} />
              </td>
            </tr>
            <tr>
              <td>
                <DiceIcon value={6} crossed />
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Match DICE</h2>
        <p>
          When dice of the same number are placed in the same column, multiply
          their value.
        </p>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <DiceIcon value={6} glow />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <DiceIcon value={6} glow />
              </td>
              <td>
                <DiceIcon value={6} glow />
              </td>
            </tr>
            <tr>
              <td>
                <DiceIcon value={6} />
              </td>
              <td>
                <DiceIcon value={6} glow />
              </td>
              <td>
                <DiceIcon value={6} glow />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <span className="blended_out">(1+1)*2</span>
                <br />4
              </td>
              <td>
                <span className="blended_out">(1+1+1)*3</span>
                <br />9
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <span className="blended_out">(2+2)*2</span>
                <br />8
              </td>
              <td>
                <span className="blended_out">(2+2+2)*3</span>
                <br />
                18
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <span className="blended_out">(3+3)*2</span>
                <br />
                12
              </td>
              <td>
                <span className="blended_out">(3+3+3)*3</span>
                <br />
                27
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <span className="blended_out">(4+4)*2</span>
                <br />
                16
              </td>
              <td>
                <span className="blended_out">(4+4+4)*3</span>
                <br />
                36
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <span className="blended_out">(5+5)*2</span>
                <br />
                20
              </td>
              <td>
                <span className="blended_out">(5+5+5)*3</span>
                <br />
                45
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                <span className="blended_out">(6+6)*2</span>
                <br />
                24
              </td>
              <td>
                <span className="blended_out">(6+6+6)*3</span>
                <br />
                54
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Win the game</h2>
        <p>The game ends when a player has lost three rounds.</p>
        <table>
          <tbody>
            <tr>
              <td className="separate">Wins the game</td>
              <td>Looses the game</td>
            </tr>
            <tr>
              <td className="separate">
                <DiceIcon value={0} />
              </td>
              <td>
                <DiceIcon value={7} />
              </td>
            </tr>
            <tr>
              <td className="separate">
                <DiceIcon value={0} />
              </td>
              <td>
                <DiceIcon value={7} />
              </td>
            </tr>
            <tr>
              <td className="separate">
                <DiceIcon value={7} />
              </td>
              <td>
                <DiceIcon value={7} />
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          A round continues until no dice have been placed. The round is won by
          the player with the highest score.
        </p>
        <table>
          <tbody>
            <tr>
              <td colSpan={3} className="separate">
                Wins the round
              </td>
              <td colSpan={3}>Looses the round</td>
            </tr>
            <tr>
              <td>9</td>
              <td>1</td>
              <td className="separate">36</td>
              <td>14</td>
              <td>10</td>
              <td>8</td>
            </tr>
            <tr>
              <td>
                <DiceIcon value={4} />
              </td>
              <td>
                <DiceIcon value={1} />
              </td>
              <td className="separate">
                <DiceIcon value={4} glow />
              </td>
              <td>
                <DiceIcon value={3} glow />
              </td>
              <td>
                <DiceIcon value={5} />
              </td>
              <td>
                <DiceIcon value={1} />
              </td>
            </tr>
            <tr>
              <td>
                <DiceIcon value={5} />
              </td>
              <td>
                <DiceIcon value={0} />
              </td>
              <td className="separate">
                <DiceIcon value={4} glow />
              </td>
              <td>
                <DiceIcon value={2} />
              </td>
              <td>
                <DiceIcon value={3} />
              </td>
              <td>
                <DiceIcon value={5} />
              </td>
            </tr>
            <tr>
              <td>
                <DiceIcon value={0} />
              </td>
              <td>
                <DiceIcon value={0} />
              </td>
              <td className="separate">
                <DiceIcon value={4} glow />
              </td>
              <td>
                <DiceIcon value={3} glow />
              </td>
              <td>
                <DiceIcon value={2} />
              </td>
              <td>
                <DiceIcon value={2} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
