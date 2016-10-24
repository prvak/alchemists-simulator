import events from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/Constants";

const EventEmitter = events.EventEmitter;
const CHANGE_EVENT = "change";

class Store extends EventEmitter {
  constructor() {
    super();
    this._constraints = [];
    this._solutions = [];
    this._all = this._makePermutations(Constants.EFFECTS);
    this._remaining = this._all.slice();
    this._solution = this._all[Math.floor(this._allPermutations.length * Math.random())];
    console.log(this._remaining.length);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  addConstraint(constraint) {
    this._constraints.push(constraint);
  }

  _makePermutations(input) {
    const results = [];
    const permute = (arr, memo) => {
      const m = memo || [];
      for (let i = 0; i < arr.length; i++) {
        const cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(m.concat(cur));
        }
        permute(arr.slice(), m.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
      return results;
    };
    return permute(input);
  }
}

const store = new Store();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case Constants.ADD_CONSTRAINT:
      store.addConstraint(action.constraint);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
