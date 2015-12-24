HighScoresPanel = React.createClass({
  render() {
    return (
      <div className="high-scores-panel panel">
        <ul className="options-list">
          <li data-target="sum-high">
            sum high scores
          </li>
          <li data-target="difference-high">
            difference high scores
          </li>
          <li data-target="product-high">
            product high score
          </li>
          <li data-target="quotient-high">
            quotient low scores
          </li>
          <li data-target="modulus-high">
            modulus high scores
          </li>
          <li data-target="options">
            back to options
          </li>
        </ul>
      </div>
    );
  }
});