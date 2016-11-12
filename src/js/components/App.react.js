import React from "react";

import Store from "../stores/Store";
import HtmlUtils from "../HtmlUtils";
import IngredientsTable from "../components/IngredientsTable.react";
import ConstraintsTable from "../components/ConstraintsTable.react";


class App extends React.Component {
  constructor() {
    super();
    this.state = this._getAppState();
    this._onChange = () => {
      this.setState(this._getAppState());
    };
    this._onTick = () => {
      const now = HtmlUtils.now();
    };
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  _startTickTimer() {
    if (!this._tickTimer) {
      setTimeout(this._onTick, 0);
      this._tickTimer = setInterval(this._onTick, 1000);
    }
  }

  _stopTickTimer() {
    if (this._tickTimer) {
      clearInterval(this._tickTimer);
      this._tickTimer = null;
    }
  }

  _getAppState() {
    return {
      constraints: Store.getConstraints(),
      histogram: Store.getHistogram(),
      remaining: Store.getRemainingSolutionsCount(),
    };
  }

  render() {
    const style = {
    };
    return (<div id="app" style={style}>
        <ConstraintsTable constraints={this.state.constraints} />
        <IngredientsTable histogram={this.state.histogram} total={this.state.remaining} />
      </div>);
  }
}

export default App;
