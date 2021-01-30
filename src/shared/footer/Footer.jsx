import React from 'react';

import classes from './Footer.module.css';
import logo from '../../assets/logo.svg';
import { Container } from '../container/Container';
import { TranslateButton } from '../i18n/TranslateButton';

export const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <Container justifyCenter alignCenter column>
        <span>© {new Date().getFullYear()} - Joaquim Neto</span>
        <br />
        <img
          src={logo}
          style={{ filter: 'invert()' }}
          alt="Joaquim Neto logo, a white J"
          loading="lazy"
          className={classes.Image}
        />
        __________
        <TranslateButton scroll />
      </Container>
    </footer>
  );
};
