import {createSelector} from 'reselect';
import {RootState} from '..';

const getCompanyState = ({company}: RootState) => company;

export const companySelector = createSelector(
  [getCompanyState],
  company => company,
);
