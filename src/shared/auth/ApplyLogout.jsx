import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { BACKEND_URL } from '../../config';
import { Actions } from '../../state/Actions';
import { useNavigation } from '../../hooks/useNavigation';

export const ApplyLogout = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { tokens } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const onDone = () => {
    dispatch({ type: Actions.LOGOUT });
    navigate('/');
  };

  const doLogout = () => {
    setLoading(true);
    axios
      .post(BACKEND_URL + '/auth/logout', null, {
        headers: { authorization: `Bearer ${tokens.refresh}` },
      })
      .then(onDone)
      .catch(onDone);
  };

  if (!loading) doLogout();

  return null;
};
