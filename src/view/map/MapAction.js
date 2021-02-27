import api from '../../utils/helpers/api';

export const getUserInfo = (data) => {
  return api({ method: 'post', url: 'api/API/UserInfo', data });
};
export const configDevice = (data) => {
  return api({ method: 'post', url: 'api/API/ConfigDevice', data });
};
export const readDeviceByDay = (data) => {
  return api({ method: 'post', url: 'api/API/ReadDeviceByDay', data });
};
export const pumpControl = (data) => {
  return api({ method: 'post', url: 'api/API/PumpControl', data });
};
