import React from 'react';
import { Container } from '../container/Container';

import classes from './Drawer.module.css';

export const Drawer = ({ children, open, onClose }) => {
  const navItemClick = (e) => {
    if (e.target.tagName === 'A') {
      onClose();
    }
  };
  return (
    <>
      <div
        className={classes.Backdrop}
        style={{ display: open ? 'block' : 'none' }}
        onClick={onClose}
      ></div>
      <Container
        className={classes.Drawer}
        style={{ transform: open ? 'translateX(0px)' : 'translateX(60vw)' }}
        column
        onClick={navItemClick}
      >
        {children}
      </Container>
    </>
  );
};
