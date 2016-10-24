import React from "react";

import Store from "../stores/Store";
import HtmlUtils from "../HtmlUtils";
import Constants from "../constants/Constants";

function getAppState() {
  return {
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = getAppState();
    this._onChange = () => {
      this.setState(getAppState());
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

  render() {
    const style = {
    };
    return (<div id="app" style={style}>
        Hello World
      </div>);
  }
}

export default App;
