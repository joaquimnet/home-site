import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Actions } from '../state/Actions';

export const fetchNewAccessToken = (auth, dispatch) => {
  axios
    .post(BACKEND_URL + '/auth/token', null, {
      headers: { authorization: `Bearer ${auth.tokens.refresh}` },
    })
    .then((res) => {
      dispatch({ type: Actions.UPDATE_ACCESS_TOKEN, payload: res.data.token });
    })
    .catch((err) => {
      if (err.response?.status === 403 || err.response?.status === 401) {
        dispatch({ type: Actions.LOGOUT });
      }
    });
};

export const fetchUser = (auth, dispatch) => {
  if (!auth.tokens.access) return;
  axios
    .get(BACKEND_URL + '/auth/me', {
      headers: { authorization: `Bearer ${auth.tokens.access}` },
    })
    .then((res) => {
      dispatch({ type: Actions.LOAD_USER, payload: res.data });
    })
    .catch((err) => {
      if (err.response?.status === 403 || err.response?.status === 401) {
        dispatch({ type: Actions.LOGOUT });
      }
    });
};
