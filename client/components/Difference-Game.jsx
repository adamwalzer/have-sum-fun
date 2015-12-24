var opts = {
  title: "difference",
  symbol: "-",
  scoreIndex: 0,
  evaluateEquation() {
    return this.selected[0].state.v - this.selected[1].state.v === this.selected[2].state.v;
  }
};

DifferenceGame = GameTemplate(opts);