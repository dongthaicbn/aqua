import api from '../../utils/helpers/api';
import { TOKEN } from '../../utils/constants/constants';

export const requestLogin = (data) => {
  localStorage.removeItem(TOKEN);
  return api({ method: 'post', url: 'api/API/UserLogin', data });
};
