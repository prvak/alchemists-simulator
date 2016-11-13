import React from "react";

import Actions from "../actions/Actions";
import Constants from "../constants/Constants";
import ConstraintsCellExperiment from "../components/ConstraintsCellExperiment.react";

class ConstraintsTable extends React.Component {
  constructor() {
    super();
    this._generateConstraint = (i1, i2) => {
      Actions.combine(i1, i2);
    };
    this._removeConstraint = (i1, i2) => {
      Actions.removeConstraint(i1, i2);
    };
  }

  render() {
    console.log(this.props.histogram);
    const total = Constants.INGREDIENTS.length;
    const rows = [];
    for (let row = 0; row < total - 1; row++) {
      const columns = [];
      for (let column = 0; column <= row; column++) {
        const i1 = column;
        const i2 = column + total - row - 1;
        const constraint = this.props.constraints.find((c) => {
          return c.index1 === i1 && c.index2 === i2;
        });
        let onClick;
        if (constraint) {
          onClick = () => { this._removeConstraint(i1, i2); };
        } else {
          onClick = () => { this._generateConstraint(i1, i2); };
        }
        columns.push(
          <span
            key={column}
            className="constraints--cell"
            onClick={onClick}
          >
            <ConstraintsCellExperiment i1={i1} i2={i2}
              constraint={constraint}
              value={this.props.histogram[row][column]}
              total={this.props.total}
            />
          </span>);
      }
      rows.push(<div key={row} className="constraints--row">{columns}</div>);
    }
    return (<div className="constraints">{rows}</div>);
  }
}

ConstraintsTable.propTypes = {
  constraints: React.PropTypes.array.isRequired,
  histogram: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default ConstraintsTable;
