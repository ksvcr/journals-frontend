import { FETCH_ROLES } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const mockRoles = [
  { id: 0, name: 'Концептуализация' },
  { id: 1, name: 'Программное обеспечение' },
  { id: 2, name: 'Получение гранта' },
  { id: 3, name: 'Курирование данных' },
  { id: 4, name: 'Руководство' },
  { id: 5, name: 'Исследование' },
  { id: 6, name: 'Анализ данных исследования' },
  { id: 7, name: 'Апробация' },
  { id: 8, name: 'Методология' },
  { id: 9, name: 'Анализ данных исследования' },
  { id: 10, name: 'Получение гранта' },
  { id: 11, name: 'Визуализация' },
  { id: 12, name: 'Написание, проверка, редактура' },
  { id: 13, name: 'Написание черновика статьи' },
];

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: []
};

function roles(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ROLES}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_ROLES}_FULFILLED`:
      const list = action.payload.results.length ? action.payload.results : mockRoles;
      const entity = entityNormalize.toObject(list);

      return { ...state,
        isPending: false,
        isFulfilled: true,
        ...entity
      };

    case `${FETCH_ROLES}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default roles;
