// App component - represents the whole app
App = React.createClass({
  aClick(e) {
    var target = e.target.getAttribute("data-target");
    if(target) {
      document.body.className = target;
      ga('send', 'event', target, 'aClick');
    }
  },
  render() {
    return (
      <div onClick={this.aClick}>
        <Welcome/>
        <SumGame/>
        <DifferenceGame/>
        <ProductGame/>
        <QuotientGame/>
        <ModulusGame/>
        <OptionsPanel/>
        <HighScoresPanel/>
        <SumHighScores/>
        <RulesPanel/>
        <SumRulesPanel/>
      </div>
    );
  }
});