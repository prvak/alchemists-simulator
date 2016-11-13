import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/Constants";

const Actions = {
  addConstraint: (constraint) => {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_CONSTRAINT,
      constraint,
    });
  },
  combine: (i1, i2) => {
    AppDispatcher.dispatch({
      actionType: Constants.COMBINE,
      i1,
      i2,
    });
  },
  removeConstraint: (i1, i2) => {
    AppDispatcher.dispatch({
      actionType: Constants.REMOVE_CONSTRAINT,
      i1,
      i2,
    });
  },
};

export default Actions;
