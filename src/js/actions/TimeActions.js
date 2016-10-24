import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";

const TimeActions = {
  addConstraint: (constraint) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.ADD_CONSTRAINT,
      constraint,
    });
  },
};

export default TimeActions;
