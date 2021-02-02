import api from '../../utils/helpers/api';
import { TOKEN } from '../../utils/constants/constants';

export const requestLogin = (acc) => {
  localStorage.removeItem(TOKEN);
  return api({
    method: 'post',
    url: '/api/v1/authenticate',
    data: { ...acc, useLdap: true },
  });
};
