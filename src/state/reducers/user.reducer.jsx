import produce from 'immer';
import { Actions } from '../Actions';

const TOKENS_KEY = 'dev.joaquimneto.authToken';

const initialState = {
  user: null,
  tokens: {
    refresh: localStorage.getItem(TOKENS_KEY),
    access: null,
  },
};

export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case Actions.LOAD_USER:
      draft.user = action.payload;
      break;
    case Actions.UPDATE_ACCESS_TOKEN:
      draft.tokens.access = action.payload;
      break;
    case Actions.LOGIN:
      draft.user = action.payload.user;
      draft.tokens = action.payload.tokens;
      localStorage.setItem(TOKENS_KEY, action.payload.tokens.refresh);
      break;
    case Actions.LOGOUT:
      draft.user = null;
      draft.tokens = { refresh: null, access: null };
      localStorage.removeItem(TOKENS_KEY);
      break;
    default:
      break;
  }
}, initialState);
