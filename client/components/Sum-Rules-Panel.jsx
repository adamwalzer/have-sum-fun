SumRulesPanel = React.createClass({
  render() {
    return (
      <div className="sum-rules-panel panel">
        <ol className="rules-list">
          <li>
            Swipe up, down, left, or right to make all of the tiles move in that direction.
          </li>
          <li>
            Each time you swipe a new tile will appear on the board randomly.
          </li>
          <li>
            When two tiles of the same value collide, they will combine to become one tile of double the value.
          </li>
          <li>
            Keep going to try to get the highest value tiles you can.
          </li>
          <li>
            The game ends when your board fills up, and you can't make any more moves.
          </li>
        </ol>
        <ul>
          <li data-target="rules">
            back to rules
          </li>
        </ul>
      </div>
    );
  }
});