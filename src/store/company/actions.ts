import {createAction} from 'redux-actions';
import {START} from '../common';

export const FETCH_COMPANIES = 'FETCH_COMPANIES';

export const fetchCompaniesAction = createAction(FETCH_COMPANIES + START);
