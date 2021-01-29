import React from 'react';
import { Container } from '../container/Container';

import classes from './Hero.module.css';

export const Hero = ({ title, subtitle, image, cta }) => {
  return (
    <Container className={classes.Hero} justifyCenter alignCenter fluid>
      <div
        className={classes.BackgroundBlur}
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden={true}
      ></div>
      <h1 className={classes.Title}>{title}</h1>
      <p className={classes.Subtitle}>{subtitle}</p>
      {cta}
    </Container>
  );
};
