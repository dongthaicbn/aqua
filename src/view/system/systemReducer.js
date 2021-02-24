import { ACCOUNT } from 'utils/constants/constants';
import * as constants from '../../utils/constants/actionType';

const initialState = {
  locale: 'vi',
  account: JSON.parse(localStorage.getItem(ACCOUNT)),
  role: [],
  isLoading: false,
  models: [],
  languages: ['vi', 'en'],
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
    case constants.FETCH_MODELS:
      return { ...state, models: action.payload };
    case constants.FETCH_LANGUAGES:
      return { ...state, languages: action.payload };
    case constants.SHOW_LOADING:
      return { ...state, isLoading: true };
    case constants.HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default system;
