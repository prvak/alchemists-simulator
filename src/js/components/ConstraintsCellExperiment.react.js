import React from "react";

import Constraint from "../components/Constraint.react";

class ConstraintsCellExperiment extends React.Component {
  render() {
    const i1 = this.props.i1;
    const i2 = this.props.i2;
    const constraint = this.props.constraint;
    return (<Constraint constraint={constraint} isBest={this.props.isBest}
      value={this.props.value} total={this.props.total}
    />);
  }
}

ConstraintsCellExperiment.propTypes = {
  i1: React.PropTypes.number.isRequired,
  i2: React.PropTypes.number.isRequired,
  constraint: React.PropTypes.object,
  total: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  isBest: React.PropTypes.bool.isRequired,
};

export default ConstraintsCellExperiment;
