import {createAction} from 'redux-actions';
import {START} from '../common';

export const FETCH_RATINGS = 'FETCH_RATINGS';
export const ADD_RATING = 'ADD_RATING';

export const fetchRatingsAction = createAction(FETCH_RATINGS + START);
export const addRatingAction = createAction(ADD_RATING + START);
