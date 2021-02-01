import { combineReducers } from 'redux';
import system from './system/systemReducer';
import solution from './solution/SolutionReducer';

export default combineReducers({
  system,
  solution,
});
