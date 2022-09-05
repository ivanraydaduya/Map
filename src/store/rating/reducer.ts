import {handleActions} from 'redux-actions';
import produce from 'immer';

import * as actions from './actions';
import {FAIL, START, SUCCESS} from '../common';
import {RatingType} from '../../types/rating';

export interface RatingState {
  loading: boolean;
  data: Array<RatingType>;
  error: any;
}

const initialState: RatingState = {
  loading: false,
  data: [],
  error: null,
};

const reducer = handleActions<RatingState, any>(
  {
    [actions.FETCH_RATINGS + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
      }),
    [actions.FETCH_RATINGS + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = payload;
        draft.error = null;
      }),
    [actions.FETCH_RATINGS + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.error = payload;
      }),
    [actions.ADD_RATING + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
      }),
    [actions.ADD_RATING + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = [...state.data, payload];
        draft.error = null;
      }),
    [actions.ADD_RATING + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.error = payload;
      }),
  },
  initialState,
);

export default reducer;
