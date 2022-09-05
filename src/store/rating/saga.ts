import {all, fork, put, take} from 'redux-saga/effects';

import {Firebase} from '../../services';
import {FAIL, START, SUCCESS} from '../common';

import * as actions from './actions';

function* fetchRatings(): any {
  while (true) {
    yield take(actions.FETCH_RATINGS + START);
    try {
      const {data} = yield Firebase.fetchRatings();

      yield put({
        type: actions.FETCH_RATINGS + SUCCESS,
        payload: Object.values(data),
      });
    } catch (error: any) {
      yield put({type: actions.FETCH_RATINGS + FAIL, payload: error});
    }
  }
}

function* addRating(): any {
  while (true) {
    const {payload} = yield take(actions.ADD_RATING + START);
    try {
      yield Firebase.addRating(payload);

      yield put({type: actions.ADD_RATING + SUCCESS, payload: payload});
    } catch (error: any) {
      yield put({type: actions.ADD_RATING + FAIL, payload: error});
    }
  }
}

export default function* () {
  yield all([fork(fetchRatings), fork(addRating)]);
}
