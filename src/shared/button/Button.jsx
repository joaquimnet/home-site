import React from 'react';

import classes from './Button.module.css';

export const Button = ({ children, className, as, block, animated, ...otherProps }) => {
  let css = classes.Button;
  if (block) css += ' ' + classes.Block;
  if (animated) css += ' ' + classes.Animated;
  if (className) css += ' ' + className;

  const Component = as || 'button';

  if (Component === 'input') {
    return <Component className={css} value={children} {...otherProps} />
  }

  return (
    <Component className={css} {...otherProps}>
      {children}
      <div className={classes.BG} />
    </Component>
  );
};
