import React from 'react';

import { Card } from '../card/Card';

import classes from './Modal.module.css';

export const Modal = ({ children, className, open, onClose, ...otherProps }) => {
  let css = classes.Modal;
  if (className) css += ' ' + className;

  if (!open) {
    return null;
  }

  const handleClose = (event) => {
    if (event.target.dataset.backdrop) {
      setImmediate(onClose);
    }
  };

  return (
    <>
      <div className={classes.Container} data-backdrop={true} onClick={handleClose}>
        <Card className={css} {...otherProps}>
          {children}
        </Card>
      </div>
      <div className={classes.Backdrop} />
    </>
  );
};
