HighScoreTemplate = function(opts) {
  return React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
      return {
        list: HighScores.find({game: opts.title}, {sort: {score: opts.sort}}).fetch()
      };
    },
    getInitialState() {
      return {
        t: opts.title || "original",
        m: opts.max || 0,
        n: opts.min || 0
      }
    },
    keyAction(e) {
      if(~document.getElementsByTagName('body')[0].className.indexOf(this.state.t+'-high')) {
        var code = e.keyCode || e.which;
        if(code === 37) this.left();
        else if(code === 39) this.right();
      }
    },
    left() {
      this.state.n = 1 - this.data.list.length;
      this.setState({
        m: Math.max(this.state.m-1,this.state.n)
      });
    },
    right() {
      this.setState({
        m: Math.min(this.state.m+1,0)
      });
    },
    componentDidMount() {
      document.addEventListener('keydown', this.keyAction);
      swipe.on(document.getElementsByClassName(this.state.t+'-high-scores')[0].getElementsByClassName("high-scores")[0], {
        left: this.left,
        right: this.right
      });
    },
    render() {
      return (
        <div className={this.state.t+"-high-scores panel"}>
          <ul>
            <li data-target="high-scores">
              back to high scores
            </li>
          </ul>
          <ul className="high-scores" style={{left: this.state.m*100+"%"}}>
            {this.data.list.map(function(el,k){
              return (
                <li key={k}>
                  <div className="score">
                    <span>
                      score 
                      {el.score}
                    </span>
                  </div>
                  <div className="board">
                    {el.board.map(function(elx,x){
                      return (
                        elx.map(function(ely,y){
                          return (
                            <div data-val={ely}>
                              <span>{ely}</span>
                            </div>
                          );
                        })
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  });
};