GameTemplate = function(opts) {

  var moveTiles = function() {
    return function(create) {
      if(!this.moving || typeof create != "undefined") {
        if(typeof create === "undefined") this.moving = true;
        var moved = false;
        for(var j=0; j<4; j++) {
          for(var i=1; i<6; i++) {
            if(this.b[j][i]) {
              for(var k=1;k<=i;k++) {
                if(!this.b[j][i-k]) {
                  this.b[j][i-k] = this.b[j][i-k+1];
                  this.b[j][i-k+1] = null;
                  this.refs["p"+this.b[j][i-k]._id].moveY(i-k);
                  moved = true;
                }
              }
            }
          }
        }
        this.afterMove(moved,create);
      }
    }
  };

  var classOpts = {
    mixins: [ReactMeteorData],
    getMeteorData: opts.helpers || function() {
      var highs = HighScores.find({game:this.t},{limit:1,sort:{score:this.sort}}).fetch();
      if(highs[0]) {
        var max = Math.max(Session.get(this.t+'-high-score'),highs[0].score)
        setVar(this.t+'-high-score',isNaN(max) ? 0 : max);
      }
      return {
        score: Session.get(this.t+'-score'),
        high: Session.get(this.t+'-high-score') || "N/A",
        title: "Have Sum Fun - "+this.t
      };
    },
    t: opts.title || "sum",
    sort: opts.sort || -1,
    move: 0,
    moving: false,
    values: opts.values || [],
    originalValues: opts.values || [],
    b: Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null)),
    getInitialState: function(){
      return {
        b: Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null)),
        selected: [],
        extraClass: ""
      };
    },
    componentWillMount: opts.created || function() {
      Session.set(this.t+'-score', 0);
      if(getVar(this.t+'-high-score')) Session.set(this.t+'-high-score',getVar(this.t+'-high-score'));
      if(!Session.get(this.t+'-high-score')) Session.set(this.t+'-high-score',0);
    },
    componentDidMount: function() {
      this.renderGame();
    },
    renderGame: opts.renderGame || function() {
      this.createPiece();
    },
    createPiece(r,s,spaces) {
      var self = this;
      r |= 0, s |= 0; 
      spaces = spaces || this.makeSpaces(this.b,this.values);
      if(spaces.length > 1) {
        var opts = {};
        var l = Math.floor(Math.random()*spaces.length);
        var space = spaces[l];
        spaces.splice(l,1);
        opts.p = this;
        opts.w = 4;
        opts.x = space.x;
        opts.y = space.y;
        opts.v = this.newZ(r,s);
        opts._id = this.pieceId++;
        this.move++;
        this.b[opts.x][opts.y] = opts;
        this.setState({b:this.b});
        if(!r) {
          r = opts.v;
          this.createPiece(r,s,spaces);
        } else if(!s) {
          s = opts.v;
          this.createPiece(r,s,spaces);
        } else {
          this.createPiece(undefined,undefined,spaces);
        }
        this.afterCreatePiece(opts);
      } else {
        this.setState({b:this.b},self.fall);
      }
    },
    canSelect: 3,
    select(piece) {
      this.selected.push(piece);
      this.setState({selected:this.selected});
      if(!--this.canSelect) {
        if(this.evaluateEquation()) {
          this.removeSelected();
        } else {
          this.deselectAll();
        }
      }
    },
    deselect(piece) {
      var i = this.selected.indexOf(piece);
      if (i > -1) {
        this.selected.splice(i, 1);
        this.setState({selected:this.selected});
        this.canSelect++;
      }
    },
    deselectAll() {
      for(var k in this.selected) {
        this.selected[k].deselect();
      }
      this.selected = [];
      this.setState({selected:this.selected});
      this.canSelect = 3;
    },
    selected: [],
    scoreIndex: typeof opts.scoreIndex === "number" ? opts.scoreIndex : 2,
    removeSelected() {
      var self = this;
      this.updateScore(this.selected[this.scoreIndex].state.v);
      loop.each(self.selected, function(piece) {
          piece.destroy();
          setTimeout(function() {
            self.b[piece.state.x][piece.state.y] = null;
          },300);
      });
      setTimeout(function() {
        self.fall();
      },300);
    },
    symbol: opts.symbol || "+",
    evaluateEquation: opts.evaluateEquation || function() {
      return this.selected[0].state.v + this.selected[1].state.v === this.selected[2].state.v;
    },
    updateScore(z) {
      var s = Session.get(this.t+'-score') + z;
      Session.set(this.t+'-score', s);
    },
    newZ: opts.newZ || function(r,s) {
      if(r && s) return r + s;
      return Math.floor(Math.random()*8+1);
    },
    pieceId: 0,
    makeSpaces: opts.makeSpaces || function(b) {
      var spaces = [];
      loop.each(b, function(c,i) {
        loop.each(c, function(d,j) {
          if(!d) {
            spaces.push({x:i,y:j});
          }
        });
      });
      return spaces;
    },
    afterCreatePiece: opts.afterCreatePiece || function(){},
    fall: moveTiles(),
    afterMove: opts.afterMove || function(moved) {
      var self = this;
      this.selected = [];
      this.canSelect = 3;
      this.moving = false;
      this.setState({
        b:this.b,
        selected:this.selected
      }, function() {
        self.makeSpaces(this.b).length===16&&self.createPiece();
      });
    },
    getGameOverMessage: opts.getGameOverMessage || function() {
      return "You scored "+Session.get(this.t+'-score')+"!";
    },
    setNewHigh: opts.setNewHigh || function(resetBoard) {
      var self = this;
      var high = Math.max(Session.get(this.t+'-score'),Session.get(this.t+'-high-score'));
      setVar(this.t+'-high-score',high);
      var b = Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null));
      for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
          if(self.b[i][j]) {
            b[3-j][i] = self.b[i][j].v;
          }
        }
      }

      if(Meteor.userId()) {
        Meteor.call('addHighScore', {
          game: this.t,
          score: Session.get(this.t+'-score'),
          board: b,
          sort: this.sort
        }, function() {
          if(resetBoard) {
            Session.set(self.t+'-score', 0);
            self.values = self.originalValues;
            self.moving = false;
            self.b = Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null));
            self.renderGame();
          }
        });
      } else if(resetBoard) {
        Session.set(this.t+'-score', 0);
        this.values = this.originalValues;
        this.moving = false;
        this.setState({b: Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null))});
        this.renderGame();
      }
    },
    clickReset() {
      this.setState({extraClass:'reset-open'});
    },
    clickResetOption(e) {
      if(e.target.tagName === "LI") {
        this.setNewHigh(e.target.className.indexOf('yes') > -1,this.b);
        this.setState({extraClass:''});
      }
    },
    clickGameOverOption(e) {
      if(e.target.tagName === "LI") {
        this.setNewHigh(e.target.className.indexOf('yes') > -1,this.b);
        this.setState({
          extraClass: ""
        });
        if(e.target.className.indexOf('no') > -1) document.getElementsByTagName('body')[0].className = "";
      }
    },
    highCopy: opts.highCopy || "high",
    render() {
      var equation = "";
      if(this.state.selected[0]) {
        equation += this.state.selected[0].val() + " " + this.symbol + " ";
        if(this.state.selected[1]) {
          equation += this.state.selected[1].val() + " = ";
          if(this.state.selected[2]) {
            equation += this.state.selected[2].val();
          }
        }
      }
      return (
        <div className={this.t+"-game game "+this.state.extraClass}>
          <div className="menu">
            <span className="options" data-target=" ">
              <span data-target=" "></span>
              <span data-target=" "></span>
              <span data-target=" "></span>
            </span>
            <img className="reset" onClick={this.clickReset} src="images/reset-icon.svg" />
          </div>
          <div className="title">{this.data.title}</div>
          <div className="score">
            <span>
              score
              {this.data.score}
            </span>
            <span>
              {this.highCopy}
              {this.data.high}
            </span>
          </div>
          <div className="equation">{equation}</div>
          <div className="board">
            {this.state.b.map(function(col){
              return (
                col.map(function(piece) {
                  if(piece) {
                    return <Piece ref={"p"+piece._id} key={piece._id} opts={piece} />
                  }
                })
              );
            })}
          </div>
          <div className="reset-menu">
            <h1>
              Reset Game?
            </h1>
            <ul onClick={this.clickResetOption}>
              <li className="yes">
                Yes
              </li>
              <li className="no">
                No
              </li>
            </ul>
          </div>
          <div className="game-over-menu">
            <h1></h1>
            <h2>
              Play Again?
            </h2>
            <ul onClick={this.clickGameOverOption}>
              <li className="yes">
                Yes
              </li>
              <li className="no">
                No
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };

  if(opts.variables) {
    for(var key in opts.variables) {
      classOpts[key] = opts.variables[key];
    }
  }

  return React.createClass(classOpts);
};