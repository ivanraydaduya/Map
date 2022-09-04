import {createSelector} from 'reselect';
import {RootState} from '..';

const getTokenState = ({token}: RootState) => token;

export const tokenSelector = createSelector([getTokenState], token => token);
