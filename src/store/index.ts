import {
  createStore,
  applyMiddleware,
  Reducer,
  CombinedState,
  AnyAction,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {TokenState} from './token/reducer';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

type RootReducer = Reducer<
  CombinedState<{
    token: TokenState;
  }>,
  AnyAction
>;

export type RootState = ReturnType<RootReducer>;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
