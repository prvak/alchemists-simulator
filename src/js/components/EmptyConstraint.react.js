import React from "react";

class EmptyConstraint extends React.Component {
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

EmptyConstraint.propTypes = {
  constraint: React.PropTypes.object,
  total: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
};

export default EmptyConstraint;
