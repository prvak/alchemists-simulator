import React from "react";

class Constraint extends React.Component {
  render() {
    const constraint = this.props.constraint;
    //return <div>{constraint}</div>;
    return <div className="constraint">+</div>;
  }
}

Constraint.propTypes = {
  constraint: React.PropTypes.object,
};

export default Constraint;
