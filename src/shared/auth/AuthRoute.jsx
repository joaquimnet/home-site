import React from 'react';
import { Route } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ children, ...props }) => {
  const { tokens } = useSelector((state) => state.auth);
  const { makeNavigation } = useNavigation();

  if (!tokens.refresh) {
    setImmediate(makeNavigation('/login'));
    return null;
  }

  return <Route {...props}>{children}</Route>;
};
