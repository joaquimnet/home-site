import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { HiUserCircle } from 'react-icons/hi';

import classes from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import { Container } from '../container/Container';
import { useNavigation } from '../../hooks/useNavigation';
import { NavItem } from './NavItem';
import { Nav } from './Nav';

export const Navbar = () => {
  const { makeNavigation } = useNavigation();

  return (
    <Container style={{ background: 'black', minHeight: '4rem' }} justifyCenter row>
      <div className={classes.Brand} style={{ cursor: 'pointer' }} onClick={makeNavigation('/')}>
        <img
          className={classes.BrandImage}
          src={logo}
          style={{ filter: 'invert()' }}
          alt="A white J"
        />{' '}
        Joaquim Neto Dev
      </div>
      <Nav>
        <NavItem text="Home" link="/" />
        <NavItem text="Blog" link="/blog" />
        <NavItem text="Login" link="/login" icon={<FiLogIn />} loggedOut />
        <NavItem text="" link="/profile" icon={<HiUserCircle size={24} />} loggedIn />
      </Nav>
    </Container>
  );
};
