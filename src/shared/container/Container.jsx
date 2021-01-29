import React from 'react';

import classes from './Container.module.css';

export const Container = ({
  children,
  alignCenter,
  justifyCenter,
  justifyStart,
  row,
  column,
  fluid,
  fadeIn,
  className,
  as,
  ...otherProps
}) => {
  let css = classes.Container;

  if (className) css += ' ' + className;
  if (alignCenter) css += ' ' + classes.AlignCenter;
  if (justifyCenter) css += ' ' + classes.JustifyCenter;
  if (justifyStart) css += ' ' + classes.JustifyStart;
  if (row) css += ' ' + classes.Row;
  if (column) css += ' ' + classes.Column;
  if (fluid) css += ' ' + classes.Fluid;
  if (fadeIn) css += ' ' + classes.FadeIn;

  let Component = as || 'div';

  return (
    <Component className={css} {...otherProps}>
      {children}
    </Component>
  );
};
