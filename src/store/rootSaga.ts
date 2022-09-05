import {all, fork} from 'redux-saga/effects';

import companySaga from './company/saga';
import ratingSaga from './rating/saga';

export default function* rootSaga() {
  yield all([fork(companySaga), fork(ratingSaga)]);
}
