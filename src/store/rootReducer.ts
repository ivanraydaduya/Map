import {combineReducers} from 'redux';

import companyReducer from './company/reducer';
import ratingReducer from './rating/reducer';

export default combineReducers({
  company: companyReducer,
  rating: ratingReducer,
});
