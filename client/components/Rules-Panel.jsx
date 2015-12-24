RulesPanel = React.createClass({
  render() {
    return (
      <div className="rules-panel panel">
        <ol className="rules-list">
          <li>
            Click on numbers to add them to the equation.
          </li>
          <li>
            Tap them again if you wish to remove them from the equation.
          </li>
          <li>
            After you've tapped three numbers, the equation will be evaluated.
          </li>
          <li>
            If the equation is correct, the tiles will be removed from the board.
          </li>
          <li>
            Once the board is completely clear, it will repopulate.
          </li>
          <li>
            The game ends when you decide there are no more moves and refresh the board.
          </li>
        </ol>
        <ul>
          <li data-target="options">
            back to options
          </li>
        </ul>
      </div>
    );
  }
});