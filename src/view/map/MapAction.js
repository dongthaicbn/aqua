import api from '../../utils/helpers/api';

export const getUserInfo = (data) => {
  return api({ method: 'post', url: 'api/API/UserInfo', data });
};
