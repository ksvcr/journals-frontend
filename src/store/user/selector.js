import { createSelector } from 'reselect';

const userSelector = state => state.user;

export const getUserData = createSelector(
  userSelector,
  user => {
    const userData = user.data;
    const isControlled = user.controlledUser && user.controlledData && userData.role === 'REDACTOR';
    return isControlled ? user.controlledData : user.data;
  }
);
