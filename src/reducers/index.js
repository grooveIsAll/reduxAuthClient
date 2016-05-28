import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';

const rootReducer = combineReducers({
    // dummie state
  // state: (state = {}) => state

  // 'form' prop of 'APP State' will be produced by 'redux-form' reducer, renamed 'form'
  form,
  auth: authReducer
});

export default rootReducer;