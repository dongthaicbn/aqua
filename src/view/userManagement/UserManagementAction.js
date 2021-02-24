import api from '../../utils/helpers/api';

export const listUser = (data) => {
  return api({ method: 'post', url: 'api/API/ViewUser', data });
};
export const addUser = (data) => {
  return api({ method: 'post', url: 'api/API/AddUser', data });
};
export const removeUser = (data) => {
  return api({ method: 'post', url: 'api/API/RemoveUser', data });
};
