import {createAction} from 'redux-actions';
import {START} from '../common';

export const FETCH_TOKENS = 'FETCH_TOKENS';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const ADD_TOKEN = 'ADD_TOKEN';

export const fetchTokensAction = createAction(FETCH_TOKENS + START);
export const fetchSuggestionsAction = createAction(FETCH_SUGGESTIONS + START);
export const addTokenAction = createAction(ADD_TOKEN + START);
