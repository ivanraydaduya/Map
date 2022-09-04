import {combineReducers} from 'redux';

import tokenReducer from './token/reducer';

export default combineReducers({
  token: tokenReducer,
});
