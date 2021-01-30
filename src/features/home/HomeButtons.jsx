import React from 'react';
import styled from 'styled-components';
import { FaBook, FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa';

import { Button } from '../../shared/button/Button';
import { useTranslationToggle } from '../../hooks/useTranslationToggle';
import { Link } from 'react-router-dom';

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;

  @media only screen and (max-width: 736px) {
    justify-content: center;
    align-items: center;
  }

  & a,
  button {
    margin: 0 1rem 1rem 0;

    & svg {
      margin-right: 0.5rem;
    }
  }
`;

const HomeButtons = () => {
  const { toggleLang, otherLang, OtherFlag } = useTranslationToggle();

  return (
    <ButtonContainer>
      <Button animated as="a" href="https://twitter.com/joaquimnet_" target="_blank" rel="noopener">
        <FaTwitter /> Twitter
      </Button>
      <Button animated as="a" href="https://github.com/joaquimnet" target="_blank" rel="noopener">
        <FaGithub /> Github
      </Button>
      <Button animated as="a" href="mailto:joaquimmy@gmail.com" target="_blank" rel="noopener">
        <FaEnvelope /> Email
      </Button>
      <Button animated as={Link} to="/blog">
        <FaBook /> Blog
      </Button>
      <Button animated onClick={toggleLang}>
        {<OtherFlag style={{ width: '24px', height: 'auto' }} />}
        {otherLang.toUpperCase()}
      </Button>
    </ButtonContainer>
  );
};

export default HomeButtons;
