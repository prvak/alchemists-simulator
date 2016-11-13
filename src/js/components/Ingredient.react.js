import React from "react";

import Atom from "../components/Atom.react";

class Ingredient extends React.Component {
  render() {
    const ingredient = this.props.ingredient;
    return (
      <div className="molecule">
        <div className="molecule--row">
          <Atom color="red" big={ingredient.big[0]} plus={ingredient.plus[0]} />
        </div>
        <div className="molecule--row">
          <Atom color="green" big={ingredient.big[1]} plus={ingredient.plus[1]} />
          <Atom color="blue" big={ingredient.big[2]} plus={ingredient.plus[2]} />
        </div>
      </div>
    );
  }
}

Ingredient.propTypes = {
  ingredient: React.PropTypes.object.isRequired,
};

export default Ingredient;
