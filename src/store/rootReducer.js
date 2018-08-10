import { combineReducers } from 'redux';

import page from './page/reducer';
import sites from './sites/reducer';
import paginate from './paginate/reducer';

export default combineReducers({
  page,
  sites,
  paginate
});
