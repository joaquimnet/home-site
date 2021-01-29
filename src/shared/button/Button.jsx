import React from 'react';

import classes from './Button.module.css';

export const Button = ({ children, className, as, ...otherProps }) => {
  let css = classes.Button;
  if (className) css += ' ' + className;

  const Component = as || 'button';

  return (
    <Component className={css} {...otherProps}>
      {children}
      <div className={classes.BG} />
    </Component>
  );
};
