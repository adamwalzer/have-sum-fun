Piece = React.createClass({
  val: function(nv) {
    typeof nv === "number" && this.setState({v:nv});
    return this.state.v;
  },
  moveY: function(ny) {
    this.setState({y:ny});
  },
  destroy: function() {
    this.setState({
      d: "destroying"
    });
  },
  pieceClick() {
    if(this.state.p.canSelect) {
      if(this.state.a) {
        this.deselect();
      } else {
        this.select();
      }
    }
  },
  select() {
    var self = this;
    this.setState({
      a: true,
      c: "active"
    }, function() {
      self.state.p.select(self);
    });
  },
  deselect() {
    var self = this;
    this.setState({
      a: false,
      c: ""
    }, function() {
      self.state.p.deselect(self);
    });
  },
  getStyle() {
    return {
      left:(this.state.x*this.state.w)+"%",
      bottom:(this.state.y*this.state.w)+"%"
    };
  },
  componentWillMount() {
    this.setState({
      w: this.props.opts.w ? 100/this.props.opts.w : 25,
      x: this.props.opts.x || 0,
      y: this.props.opts.y || 0,
      v: typeof this.props.opts.v === "number" ? this.props.opts.v : 2,
      m: this.props.opts.m || 0,
      p: this.props.opts.p || {},
      c: "",
      d: "",
      a: false
    });
  },
  render: function() {
    return (
      <div className={this.state.c + " " + this.state.d} data-val={this.state.v} onClick={this.pieceClick} style={this.getStyle()}><span>{this.state.v}</span></div>
    );
  }
});