import React from 'react';

import classes from './Button.module.css';

export const Fab = ({ children, className, as, ...otherProps }) => {
  let css = classes.Fab;
  if (className) css += ' ' + className;

  const Component = as || 'button';

  if (Component === 'input') {
    return <Component className={css} value={children} {...otherProps} />;
  }

  return (
    <Component className={css} {...otherProps}>
      {children}
      <div className={classes.FabBG} />
    </Component>
  );
};
