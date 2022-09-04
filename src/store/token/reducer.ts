import {handleActions} from 'redux-actions';
import produce from 'immer';

import * as actions from './actions';
import {FAIL, START, SUCCESS} from '../common';
import {Price} from '../../types/price';

export interface TokenState {
  loading: boolean;
  data: Array<Price>;
  suggestions: Array<any>;
  error: any;
}

const initialState: TokenState = {
  loading: false,
  data: [],
  suggestions: [],
  error: null,
};

const reducer = handleActions<TokenState, any>(
  {
    [actions.FETCH_TOKENS + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
      }),
    [actions.FETCH_TOKENS + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = payload;
        draft.error = null;
      }),
    [actions.FETCH_TOKENS + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.error = payload;
      }),

    [actions.FETCH_SUGGESTIONS + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
        draft.suggestions = [];
      }),
    [actions.FETCH_SUGGESTIONS + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.suggestions = payload;
        draft.error = null;
      }),
    [actions.FETCH_SUGGESTIONS + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.suggestions = [];
        draft.error = payload;
      }),

    [actions.ADD_TOKEN + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
      }),
    [actions.ADD_TOKEN + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = [...state.data, ...payload];
        draft.error = null;
      }),
    [actions.ADD_TOKEN + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = [];
        draft.error = payload;
      }),
  },
  initialState,
);

export default reducer;
