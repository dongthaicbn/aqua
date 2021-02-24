import { ACCOUNT } from 'utils/constants/constants';
import * as constants from '../../utils/constants/actionType';

const initialState = {
  locale: 'vi',
  account: JSON.parse(localStorage.getItem(ACCOUNT)),
  role: [],
  users: [],
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case constants.CHANGE_LANG:
      return { ...state, locale: action.payload };
    case constants.FETCH_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        role: action.payload.permission,
      };
    case constants.FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default system;
