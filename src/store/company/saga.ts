import {all, fork, put, take} from 'redux-saga/effects';

import {Firebase} from '../../services';
import {FAIL, START, SUCCESS} from '../common';

import * as actions from './actions';

function* fetchCompanies(): any {
  while (true) {
    yield take(actions.FETCH_COMPANIES + START);
    try {
      const {data} = yield Firebase.fetchCompanies();

      yield put({
        type: actions.FETCH_COMPANIES + SUCCESS,
        payload: Object.values(data),
      });
    } catch (error: any) {
      yield put({type: actions.FETCH_COMPANIES + FAIL, payload: error});
    }
  }
}

export default function* () {
  yield all([fork(fetchCompanies)]);
}
