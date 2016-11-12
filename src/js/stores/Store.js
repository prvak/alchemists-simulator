import events from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/Constants";
import Rules from "../Rules";

const EventEmitter = events.EventEmitter;
const CHANGE_EVENT = "change";

class Store extends EventEmitter {
  constructor() {
    super();
    this._constraints = [];
    this._solutions = [];
    this._all = this._makePermutations([0, 1, 2, 3, 4, 5, 6, 7]);
    this._remaining = this._all.slice();
    // choose random solution
    this._solution = this._all[Math.floor(this._all.length * Math.random())];
    this._histogram = [];
    this._clearHistogram();
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

  getConstraints() {
    return this._constraints;
  }

  getHistogram() {
    return this._histogram;
  }

  getRemainingSolutionsCount() {
    return this._remaining.length;
  }

  addConstraint(constraint) {
    // {i1, i2, hint}
    // Add constraint.
    this._constraints.push(constraint);
    // Update remaining solutions.
    this._remaining = this._remaining.filter((permutation) => {
      const index1 = permutation[constraint.index1];
      const index2 = permutation[constraint.index2];
      const i1 = Constants.INGREDIENTS[index1];
      const i2 = Constants.INGREDIENTS[index2];
      return Rules.verifyHint(constraint.hint, i1, i2);
    });
    // Update histogram.
    this._clearHistogram();
    this._remaining.forEach((solution) => {
      solution.forEach((ingredient, index) => {
        this._histogram[ingredient][index] += 1;
      });
    });
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

  _clearHistogram() {
    this._histogram = [];
    Constants.INGREDIENTS.forEach(() => {
      const counts = Array(Constants.INGREDIENTS.length).fill(0);
      this._histogram.push(counts);
    });
  }

}


const store = new Store();
store.addConstraint({ hint: Constants.HINTS.redPlus, index1: 0, index2: 1 });
store.addConstraint({ hint: Constants.HINTS.greenPlus, index1: 2, index2: 3 });
store.addConstraint({ hint: Constants.HINTS.bluePlus, index1: 4, index2: 5 });
store.addConstraint({ hint: Constants.HINTS.greenMinus, index1: 6, index2: 7 });
store.addConstraint({ hint: Constants.HINTS.blueMinus, index1: 0, index2: 7 });

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
