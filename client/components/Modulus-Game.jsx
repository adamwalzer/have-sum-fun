var opts = {
  title: "modulus",
  symbol: "%",
  scoreIndex: 0,
  evaluateEquation() {
    return this.selected[0].state.v % this.selected[1].state.v === this.selected[2].state.v;
  },
  newZ(r,s) {
    if(r && s) return r % s;
    return Math.floor(Math.random()*10+1);
  }
};

ModulusGame = GameTemplate(opts);