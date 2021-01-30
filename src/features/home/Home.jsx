import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import { Page } from '../../shared/page/Page';

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

const HomeButtons = lazy(() => import('./HomeButtons'));

export function Home() {
  const { t } = useTranslation();

  return (
    <StyledHome>
      <h1 className="text-center">{t('welcomeTitle')}</h1>
      <p className="text-center">
        <Trans i18nKey="welcomeParagraph">
          <Link to="/blog" />
        </Trans>
      </p>
      <hr />
      <Suspense fallback={null}>
        <HomeButtons />
      </Suspense>
    </StyledHome>
  );
}
