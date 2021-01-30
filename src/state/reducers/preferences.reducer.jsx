import produce from 'immer';

import { Actions } from '../Actions';
import { LOCAL_STORAGE_LANGUAGE_KEY } from '../../i18n';

const initialState = {
  language: localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || 'en',
};

export const preferencesReducer = produce((draft, action) => {
  switch (action.type) {
    case Actions.CHANGE_LANGUAGE:
      draft.language = action.payload;
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, action.payload);
      break;
    default:
      break;
  }
}, initialState);
