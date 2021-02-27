import { TOKEN } from 'utils/constants/constants';
import { isEmpty } from 'utils/helpers/helpers';
import * as constants from '../../utils/constants/actionType';
import api from '../../utils/helpers/api';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api({
      method: 'post',
      url: 'api/API/ViewUser',
      data: { [TOKEN]: localStorage.getItem(TOKEN) },
    });
    if (!isEmpty(data.data)) {
      dispatch({ type: constants.FETCH_USERS, payload: data.data });
    }
  } catch (error) {}
};
export const listUser = (data) => {
  return api({ method: 'post', url: 'api/API/ViewUser', data });
};
export const addUser = (data) => {
  return api({ method: 'post', url: 'api/API/AddUser', data });
};
export const removeUser = (data) => {
  return api({ method: 'post', url: 'api/API/RemoveUser', data });
};
export const addDeviceID = (data) => {
  return api({ method: 'post', url: 'api/API/AddDeviceID', data });
};
export const removeDeviceID = (data) => {
  return api({ method: 'post', url: 'api/API/RemoveDeviceID', data });
};
