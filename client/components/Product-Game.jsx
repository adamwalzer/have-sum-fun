var opts = {
  title: "product",
  symbol: "*",
  scoreIndex: 2,
  evaluateEquation() {
    return this.selected[0].state.v * this.selected[1].state.v === this.selected[2].state.v;
  },
  newZ(r,s) {
    if(r && s) return r * s;
    return Math.floor(Math.random()*5+1);
  }
};

ProductGame = GameTemplate(opts);