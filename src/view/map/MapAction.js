import api from '../../utils/helpers/api';
import * as actionType from '../../utils/constants/actionType';

const SOLUTION_URL = '/api/v1/management';

export const getSolutions = (params) => async (dispatch) => {
  try {
    const { data } = await api({
      method: 'get',
      url: SOLUTION_URL + '/solutions',
      params,
    });
    dispatch({ type: actionType.FETCH_SOLUTION, payload: data.data });
  } catch (error) {}
};
export const clearSolutions = () => ({
  type: actionType.FETCH_SOLUTION,
  payload: {},
});
export const getSolutionService = (params) => {
  return api({
    method: 'get',
    url: SOLUTION_URL + '/solutions',
    params,
  });
};
export const getAllSolution = (params) => {
  return api({
    method: 'get',
    url: '/api/v1/management/solutions/all',
    params,
  });
};
export const createSolution = (data) => {
  return api({
    method: 'post',
    url: SOLUTION_URL + '/solutions',
    data,
  });
};
export const reorderSolution = (data) => {
  return api({
    method: 'post',
    url: SOLUTION_URL + '/solutions/reorder',
    data,
  });
};
export const pushNotiSolution = (data) => {
  return api({
    method: 'post',
    url: SOLUTION_URL + '/firebase/push-new-solution',
    data,
  });
};
export const cloneSolution = (data) => {
  return api({
    method: 'post',
    url: SOLUTION_URL + '/solutions/clone-solutions',
    data,
  });
};
export const deleteSolution = (params) => {
  return api({
    method: 'delete',
    url: SOLUTION_URL + '/solutions/delete-solution',
    params,
  });
};
