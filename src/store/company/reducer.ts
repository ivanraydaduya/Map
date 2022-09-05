import {handleActions} from 'redux-actions';
import produce from 'immer';

import * as actions from './actions';
import {FAIL, START, SUCCESS} from '../common';
import {Company} from '../../types/company';

export interface CompanyState {
  loading: boolean;
  data: Array<Company>;
  error: any;
}

const initialState: CompanyState = {
  loading: false,
  data: [],
  error: null,
};

const reducer = handleActions<CompanyState, any>(
  {
    [actions.FETCH_COMPANIES + START]: state =>
      produce(state, draft => {
        draft.loading = true;
        draft.error = null;
      }),
    [actions.FETCH_COMPANIES + SUCCESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.data = payload;
        draft.error = null;
      }),
    [actions.FETCH_COMPANIES + FAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = false;
        draft.error = payload;
      }),
  },
  initialState,
);

export default reducer;
