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
    this._ingredientsTable = this._computeIngredientsTable();
    this._constraintsTable = this._computeConstraintsTable();
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

  getIngredientsTable() {
    return this._ingredientsTable;
  }

  getConstraintsTable() {
    return this._constraintsTable;
  }

  getRemainingSolutionsCount() {
    return this._remaining.length;
  }

  addConstraint(constraint) {
    // {i1, i2, hint}
    // Add constraint.
    this._constraints.push(constraint);
    // Update remaining solutions.
    this._remaining = this._filterSolutions(constraint);
    // Update tables.
    this._constraintsTable = this._computeConstraintsTable();
    this._ingredientsTable = this._computeIngredientsTable();
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
        this._remaining = this._filterSolutions(constraint);
      });
      // Update tables.
      this._constraintsTable = this._computeConstraintsTable();
      this._ingredientsTable = this._computeIngredientsTable();
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

  _computeIngredientsTable() {
    // Clear table.
    const rows = [];
    Constants.INGREDIENTS.forEach(() => {
      const counts = Array(Constants.INGREDIENTS.length).fill(0);
      rows.push(counts);
    });
    // Fill in values.
    this._remaining.forEach((solution) => {
      solution.forEach((ingredient, index) => {
        rows[ingredient][index] += 1;
      });
    });
    return rows;
  }

  _computeConstraintsTable() {
    const currentRemaining = this._remaining.length;
    const length = Constants.INGREDIENTS.length;
    const hints = [
      Constants.HINTS.redPlus,
      Constants.HINTS.redMinus,
      Constants.HINTS.greenPlus,
      Constants.HINTS.greenMinus,
      Constants.HINTS.bluePlus,
      Constants.HINTS.blueMinus,
      Constants.HINTS.neutral,
    ];
    // Compute new table.
    const rows = [];
    for (let row = 0; row < length - 1; row++) {
      const columns = [];
      for (let column = 0; column <= row; column++) {
        const index1 = column;
        const index2 = column + length - row - 1;
        let totalGain = 0;
        let validHints = hints.length;
        hints.forEach((hint) => {
          const constraint = { hint, index1, index2 };
          const remaining = this._filterSolutions(constraint).length;
          const gain = currentRemaining - remaining;
          if (gain === 0 || gain === currentRemaining) {
            validHints -= 1;
          } else {
            totalGain += gain;
          }
        });
        if (validHints === 0) {
          columns.push(0);
        } else {
          columns.push(totalGain / hints.length);
        }
      }
      rows.push(columns);
    }
    return rows;
  }

  /**
   * Remove from the list of remaining possible solutions those solutions
   * that do not satisfy given constraint.
   */
  _filterSolutions(constraint) {
    return this._remaining.filter((permutation) => {
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
