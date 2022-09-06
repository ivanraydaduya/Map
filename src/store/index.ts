import {
  createStore,
  applyMiddleware,
  Reducer,
  CombinedState,
  AnyAction,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {CompanyState} from './company/reducer';
import {RatingState} from './rating/reducer';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

type RootReducer = Reducer<
  CombinedState<{
    company: CompanyState;
    rating: RatingState;
  }>,
  AnyAction
>;

export type RootState = ReturnType<RootReducer>;

const sagaMiddleware = createSagaMiddleware();

// for offline mode
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['rating'],
};

export default function configureStore() {
  const persistedReducer = persistReducer<RootState, any>(
    persistConfig,
    rootReducer,
  );
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
