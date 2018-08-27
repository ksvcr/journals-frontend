import { combineReducers } from 'redux';

import page from './page/reducer';
import sites from './sites/reducer';
import articles from './articles/reducer';
import user from './user/reducer';
import paginate from './paginate/reducer';

export default combineReducers({
  page,
  sites,
  articles,
  user,
  paginate
});
