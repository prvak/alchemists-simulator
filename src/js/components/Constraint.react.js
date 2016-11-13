import React from "react";

class Constraint extends React.Component {
  _getColorClass(hint) {
    const colors = hint.colors;
    if (colors[0]) return "constraint--red";
    else if (colors[1]) return "constraint--green";
    else if (colors[2]) return "constraint--blue";
    return "constraint--neutral";
  }

  _getSignClass(hint) {
    if (hint.minus) return "constraint--minus";
    else if (hint.plus) return "constraint--plus";
    else if (hint.neutral) return "constraint--neutral";
    throw new Error("Unexpected constraint sign.");
  }

  render() {
    const constraint = this.props.constraint;
    const baseClass = "constraint clickable";
    if (constraint) {
      const hint = constraint.hint;
      const colorClass = this._getColorClass(hint);
      const signClass = this._getSignClass(hint);
      const className = `${baseClass} ${colorClass} ${signClass}`;
      return <div className={className}></div>;
    } else {
      const gain = 100 * this.props.value / this.props.total;
      const bestClass = this.props.isBest ? "constraint--best" : "";
      const className = `${baseClass} ${bestClass} constraint--empty`;
      return <div className={className}>{gain.toFixed(1)}%</div>;
    }
  }
}

Constraint.propTypes = {
  constraint: React.PropTypes.object,
  total: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  isBest: React.PropTypes.bool.isRequired,
};

export default Constraint;
