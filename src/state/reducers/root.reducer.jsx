import { combineReducers } from 'redux';

import { userReducer } from './user.reducer';
import { preferencesReducer } from './preferences.reducer';

export const rootReducer = combineReducers({
  auth: userReducer,
  preferences: preferencesReducer,
});
