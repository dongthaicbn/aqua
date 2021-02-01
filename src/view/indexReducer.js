import { combineReducers } from 'redux';
import system from './system/systemReducer';
import map from './map/MapReducer';

export default combineReducers({
  system,
  map,
});
