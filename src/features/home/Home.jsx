import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { FaGithub, FaTwitter, FaEnvelope, FaBook } from 'react-icons/fa';

import { Page } from '../../shared/page/Page';
import { Button } from '../../shared/button/Button';
import { useTranslationToggle } from '../../hooks/useTranslationToggle';

const StyledHome = styled(Page)`
  & h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
    text-shadow: 1px 4px 3px #772020;
  }

  @media only screen and (max-width: 736px) {
    & h1 {
      font-size: 3rem;
    }
  }
`;

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

export function Home() {
  const { t } = useTranslation();
  const { toggleLang, otherLang, OtherFlag } = useTranslationToggle();

  return (
    <StyledHome>
      <h1 className="text-center">{t('welcomeTitle')}</h1>
      <p className="text-center">
        <Trans i18nKey="welcomeParagraph">
          <Link to="/blog" />
        </Trans>
      </p>
      <hr />
      <ButtonContainer>
        <Button
          animated
          as="a"
          href="https://twitter.com/joaquimnet_"
          target="_blank"
          rel="noopener"
        >
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
          {<OtherFlag style={{width: '24px', height: 'auto'}} />}
          {otherLang.toUpperCase()}
        </Button>
      </ButtonContainer>
    </StyledHome>
  );
}
