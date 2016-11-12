import React from "react";

import Constants from "../constants/Constants";
import ConstraintsCellExperiment from "../components/ConstraintsCellExperiment.react";

class ConstraintsTable extends React.Component {
  render() {
    const total = Constants.INGREDIENTS.length;
    const rows = [];
    for (let row = 0; row < total; row++) {
      const columns = [];
      for (let column = 0; column <= row; column++) {
        const i1 = column;
        const i2 = column + total - row;
        const constraint = null;
        columns.push(<span className="constraints--cell">
          <ConstraintsCellExperiment i1={i1} i2={i2} constraint={constraint} />
        </span>);
      }
      rows.push(<div className="constraints--row">{columns}</div>);
    }
    return (<div className="constraints">{rows}</div>);
  }
}

ConstraintsTable.propTypes = {
  constraints: React.PropTypes.array.isRequired,
};

export default ConstraintsTable;
