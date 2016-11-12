import React from "react";

import Constants from "../constants/Constants";

class IngredientsCell extends React.Component {
  render() {
    const total = this.props.total;
    const value = this.props.value;
    const probability = 100 * value / total;
    let className = "probability";
    if (value === 0) {
      className += " no";
    } else if (value === total) {
      className += " yes";
    }
    return <span className={className}>{probability}%</span>;
  }
}

IngredientsCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default IngredientsCell;
