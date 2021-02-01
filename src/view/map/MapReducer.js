import * as ActionType from '../../utils/constants/actionType';

const initialState = {
  solutions: {},
};

const solution = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_SOLUTION:
      return { ...state, solutions: action.payload };
    default:
      return state;
  }
};

export default solution;
