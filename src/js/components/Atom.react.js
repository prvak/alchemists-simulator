import React from "react";

class Atom extends React.Component {
  render() {
    const baseClass = "atom";
    const colorClass = `atom--${this.props.color}`;
    const sizeClass = this.props.big ? "atom--big" : "atom--small";
    const signClass = this.props.plus ? "atom--plus" : "atom--minus";
    const className = `${baseClass} ${colorClass} ${sizeClass} ${signClass}`;
    return (<div className={className}></div>);
  }
}

Atom.propTypes = {
  color: React.PropTypes.string.isRequired,
  big: React.PropTypes.bool.isRequired,
  plus: React.PropTypes.bool.isRequired,
};

export default Atom;
