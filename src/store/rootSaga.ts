import {all, fork} from 'redux-saga/effects';

import tokenSaga from './token/saga';

export default function* rootSaga() {
  yield all([fork(tokenSaga)]);
}
