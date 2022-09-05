import {createSelector} from 'reselect';
import {RootState} from '..';

const getRatingState = ({rating}: RootState) => rating;

export const ratingSelector = createSelector(
  [getRatingState],
  rating => rating,
);
