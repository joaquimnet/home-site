import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Actions } from '../../state/Actions';
import { BACKEND_URL } from '../../config';
import { useNavigation } from '../../hooks/useNavigation';
import { Page } from '../../shared/page/Page';
import { Button } from '../../shared/button/Button';
import { Container } from '../../shared/container/Container';

const StyledLoginForm = styled.form`
  padding: 0 2rem 2rem 2rem;
  box-shadow: 0 3px 8px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0.125rem;
  background-color: #1d1d1d;

  & h1 {
    text-shadow: 3px 3px rgba(74, 213, 231, 0.3), -2px -2px 2px rgba(231, 74, 74, 0.3);
  }
`;

export const Login = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const doLogin = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post(BACKEND_URL + '/auth/login', { email, password });
      setError(null);
      dispatch({
        type: Actions.LOGIN,
        payload: {
          user: res.data.user,
          tokens: {
            refresh: res.data.refreshToken,
            access: res.data.accessToken,
          },
        },
      });
      setImmediate(() => navigate('/profile'));
    } catch (err) {
      console.error(err.response || err);
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Page style={{ alignItems: 'center' }}>
        <StyledLoginForm onSubmit={doLogin}>
          <h1 style={{ textAlign: 'center' }}>Login</h1>
          <div className="form-control">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              name="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              name="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Container alignCenter style={{ height: 'auto' }}>
            <Button type="submit" name="submit" id="loginSubmit">
              Login
            </Button>
          </Container>
          {error && (
            <div className="error">
              <FaTimes className="icon" color="red" /> {error}
            </div>
          )}
        </StyledLoginForm>
      </Page>
    </>
  );
};
