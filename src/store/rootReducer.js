import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import languages from './languages/reducer';
import rubrics from './rubrics/reducer';
import sites from './sites/reducer';
import articles from './articles/reducer';
import articleHistory from './articleHistory/reducer';
import articleVersions from './articleVersions/reducer';
import user from './user/reducer';
import users from './users/reducer';
import reviewInvites from './reviewInvites/reducer';
import discounts from './discounts/reducer';
import lawtypes from './lawtypes/reducer';
import countries from './countries/reducer';
import reviews from './reviews/reducer';
import roles from './roles/reducer';
import stats from './stats/reducer';

export default combineReducers({
  form: formReducer,
  languages,
  rubrics,
  sites,
  articles,
  articleHistory,
  articleVersions,
  user,
  users,
  reviewInvites,
  discounts,
  lawtypes,
  countries,
  reviews,
  roles,
  stats
});

