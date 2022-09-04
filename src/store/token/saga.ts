import {all, fork, put, select, take} from 'redux-saga/effects';
import {RootState} from '..';
import {Coingecko} from '../../services';
import {Price} from '../../types/price';
import {FAIL, START, SUCCESS} from '../common';
import * as actions from './actions';
import {tokenSelector} from './selector';

function* fetchTokens(): any {
  while (true) {
    yield take(actions.FETCH_TOKENS + START);
    try {
      const state: RootState = yield select();
      const {data} = tokenSelector(state);

      const coingeckoIds = data.map((item: Price) => item.id);

      const values = yield Coingecko.fetchCoin(coingeckoIds);

      yield put({type: actions.FETCH_TOKENS + SUCCESS, payload: values});
    } catch (error: any) {
      yield put({type: actions.FETCH_TOKENS + FAIL, payload: error});
    }
  }
}

function* fetchSuggestions(): any {
  while (true) {
    const {payload} = yield take(actions.FETCH_SUGGESTIONS + START);
    try {
      const data = yield Coingecko.fetchCoinSuggestions(payload.keyword);

      yield put({type: actions.FETCH_SUGGESTIONS + SUCCESS, payload: data});
    } catch (error: any) {
      yield put({type: actions.FETCH_SUGGESTIONS + FAIL, payload: error});
    }
  }
}

function* addToken(): any {
  while (true) {
    const {payload} = yield take(actions.ADD_TOKEN + START);
    try {
      const data = yield Coingecko.fetchCoin(payload.id);

      yield put({type: actions.ADD_TOKEN + SUCCESS, payload: data});
    } catch (error: any) {
      yield put({type: actions.ADD_TOKEN + FAIL, payload: error});
    }
  }
}

export default function* () {
  yield all([fork(fetchTokens), fork(fetchSuggestions), fork(addToken)]);
}
