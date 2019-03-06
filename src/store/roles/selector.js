import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const rolesSelector = state => state.roles;

export const getRolesArray = createSelector(
  rolesSelector,
  roles => {
    return entityNormalize.toArray(roles.data, roles.ids);
  }
);
