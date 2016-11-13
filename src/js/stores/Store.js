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
    this._computeHistogram();
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
    this._filterSolutions(constraint);
    // Update histogram.
    this._computeHistogram();
  }

  combine(index1, index2) {
    this.removeConstraint(index1, index2);
    const i1 = Constants.INGREDIENTS[this._solution[index1]];
    const i2 = Constants.INGREDIENTS[this._solution[index2]];
    const hint = Rules.combine(i1, i2);
    this.addConstraint({ hint, index1, index2 });
  }

  removeConstraint(index1, index2) {
    let removed = false;
    for (let i = 0; i < this._constraints.length; i++) {
      const constraint = this._constraints[i];
      if (constraint.index1 === index1 && constraint.index2 === index2) {
        this._constraints.splice(i, 1);
        removed = true;
      }
    }
    if (removed) {
      // Regenerate list of remaining solutions.
      this._remaining = this._all.slice();
      this._constraints.forEach((constraint) => {
        this._filterSolutions(constraint);
      });
      this._computeHistogram();
    }
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

  _computeHistogram() {
    // Clear histogram.
    this._histogram = [];
    Constants.INGREDIENTS.forEach(() => {
      const counts = Array(Constants.INGREDIENTS.length).fill(0);
      this._histogram.push(counts);
    });
    // Fill in values.
    this._remaining.forEach((solution) => {
      solution.forEach((ingredient, index) => {
        this._histogram[ingredient][index] += 1;
      });
    });
  }

  _filterSolutions(constraint) {
    this._remaining = this._remaining.filter((permutation) => {
      const index1 = permutation[constraint.index1];
      const index2 = permutation[constraint.index2];
      const i1 = Constants.INGREDIENTS[index1];
      const i2 = Constants.INGREDIENTS[index2];
      return Rules.verifyHint(constraint.hint, i1, i2);
    });
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
    case Constants.COMBINE:
      store.combine(action.i1, action.i2);
      store.emitChange();
      break;
    case Constants.REMOVE_CONSTRAINT:
      store.removeConstraint(action.i1, action.i2);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
