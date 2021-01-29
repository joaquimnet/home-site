/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewAccessToken, fetchUser } from '../../api/auth';

export const UserFetcher = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => fetchNewAccessToken(auth, dispatch), []);
  useEffect(() => fetchUser(auth, dispatch), [auth.tokens.access]);

  return null;
};
