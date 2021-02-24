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
  } catch (error) {}
};
export const updateAccountInfo = (data) => ({
  type: constants.FETCH_ACCOUNT,
  payload: data,
});
export const changePassword = (data) => {
  return api({ method: 'post', url: 'api/API/UserChangePassword', data });
};
export const addDeviceID = (data) => {
  return api({ method: 'post', url: '/api/API/AddDeviceID', data });
};
export const removeDeviceID = (data) => {
  return api({ method: 'post', url: '/api/API/RemoveDeviceID', data });
};
