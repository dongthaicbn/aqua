import api from '../../utils/helpers/api';

export const addDeviceID = (data) => {
  return api({ method: 'post', url: 'api/API/AddDeviceID', data });
};
export const removeDeviceID = (data) => {
  return api({ method: 'post', url: 'api/API/RemoveDeviceID', data });
};
