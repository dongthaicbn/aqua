import api from 'utils/helpers/api';
import * as constants from 'utils/constants/actionType';
// import { isEmpty } from 'utils/helpers/helpers';

export const actionChangeLang = (lang) => ({
  type: constants.CHANGE_LANG,
  payload: lang,
});

export const getAccountInfo = () => async (dispatch) => {
  try {
    const { data } = await api({ method: 'get', url: '/api/v1/accounts/me' });
    dispatch({ type: constants.FETCH_ACCOUNT, payload: data.data });
  } catch (error) {
    // handle error common
  }
};

export const updateAccountInfo = (data) => ({
  type: constants.FETCH_ACCOUNT,
  payload: data,
});

export const requestLogout = () => {
  return api({ method: 'get', url: '/api/logout' });
};

export const actionShowLoading = () => ({
  type: constants.SHOW_LOADING,
});

export const actionHideLoading = () => ({
  type: constants.HIDE_LOADING,
});

export const getModels = () => async (dispatch) => {
  try {
    const { data } = await api({
      method: 'get',
      url: '/api/v1/management/settings/models',
    });
    dispatch({ type: constants.FETCH_MODELS, payload: data.data });
  } catch (error) {}
};
export const getLanguages = () => async (dispatch) => {
  try {
    const { data } = await api({
      method: 'get',
      url: '/api/v1/management/settings/languages',
    });
    dispatch({ type: constants.FETCH_LANGUAGES, payload: data.data });
  } catch (error) {}
};
export const removeUser = (data) => {
  return api({ method: 'post', url: 'api/API/UserChangePassword', data });
};
