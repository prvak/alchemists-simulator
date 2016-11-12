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
    let className = baseClass;
    if (constraint) {
      const hint = constraint.hint;
      const colorClass = this._getColorClass(hint);
      const signClass = this._getSignClass(hint);
      className = `${baseClass} ${colorClass} ${signClass}`;
    }
    return <div className={className}></div>;
  }
}

Constraint.propTypes = {
  constraint: React.PropTypes.object,
};

export default Constraint;
