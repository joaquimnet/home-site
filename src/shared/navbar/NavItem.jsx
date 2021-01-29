import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.css';

export const NavItem = ({ text, link, icon, loggedIn, loggedOut }) => {
  const auth = useSelector((state) => state.auth);

  // if it required loggedIn but no user, return empty
  if (loggedIn && !auth.user) {
    return null;
  }

  // if it required loggedOut but has user, return empty
  if (loggedOut && auth.user) {
    return null;
  }

  return (
    <li className={classes.NavItem}>
      <Link to={link}>
        {icon ? icon : null}
        {text}
      </Link>
    </li>
  );
};
