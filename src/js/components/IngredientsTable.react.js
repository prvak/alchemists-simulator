import React from "react";

import IngredientsCell from "../components/IngredientsCell.react";

class IngredientsTable extends React.Component {
  render() {
    const total = this.props.total;
    const rows = [];
    this.props.histogram.forEach((row, rowId) => {
      const columns = [];
      row.forEach((value, columnId) => {
        columns.push(<td className="ingredients--cell" key={columnId}>
          <IngredientsCell value={value} total={total} />
        </td>);
      });
      rows.push(<tr className="ingredients--row" key={rowId}>{columns}</tr>);
    });
    return (<table className="ingredients"><tbody>{rows}</tbody></table>);
  }
}

IngredientsTable.propTypes = {
  histogram: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default IngredientsTable;
