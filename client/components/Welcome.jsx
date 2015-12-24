// Welcome component - represents the whole app
Welcome = React.createClass({
  render() {
    return (
      <div className="welcome">
        <h1 className="logo">
          Have Sum Fun
        </h1>
        <ul>
          <li data-target="sum">
            sum
          </li>
          <li data-target="difference">
            difference
          </li>
          <li data-target="product">
            product
          </li>
          <li data-target="quotient">
            quotient
          </li>
          <li data-target="modulus">
            modulus
          </li>
          <li data-target="options">
            options
          </li>
        </ul>
      </div>
    );
  }
});