import React from "react";

import Ingredient from "../components/Ingredient.react";

class IngredientsCell extends React.Component {
  render() {
    const value = this.props.value;
    const total = this.props.total;
    const probability = 100 * value / total;
    let className = "ingredients--cell";
    if (value === 0) {
      className += " no";
    } else if (value === total) {
      className += " yes";
    }
    return (
      <td className={className}>
        <div className="ingredients--inner-cell">
          <Ingredient ingredient={this.props.ingredient} />
          <span className="probability">{probability.toFixed(0)}%</span>
        </div>
      </td>);
  }
}

IngredientsCell.propTypes = {
  ingredient: React.PropTypes.object.isRequired,
  total: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
};

export default IngredientsCell;
