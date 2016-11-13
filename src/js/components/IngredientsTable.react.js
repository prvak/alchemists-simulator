import React from "react";

import Constants from "../constants/Constants";
import IngredientsCell from "../components/IngredientsCell.react";

class IngredientsTable extends React.Component {
  render() {
    const total = this.props.total;
    const rows = [];
    this.props.histogram.forEach((row, rowId) => {
      const cells = [];
      row.forEach((value, cellId) => {
        const ingredient = Constants.INGREDIENTS[rowId];
        cells.push(
          <IngredientsCell key={cellId}
            ingredient={ingredient} total={total} value={value}
          />);
      });
      rows.push(<tr className="ingredients--row" key={rowId}>{cells}</tr>);
    });
    return (<table className="ingredients"><tbody>{rows}</tbody></table>);
  }
}

IngredientsTable.propTypes = {
  histogram: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default IngredientsTable;
