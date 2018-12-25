import { createSelector } from 'reselect';

const operationsSelector = state => state.discounts.users_operations;

export const getIncomingOperations = createSelector(
  operationsSelector,
  operations => operations.filter(({ amount }) => amount > 0)
);

export const getOutcomingOperations = createSelector(
  operationsSelector,
  operations => operations.filter(({ amount }) => amount < 0)
);
