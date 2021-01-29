import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Page } from '../../shared/page/Page';

const StyledHome = styled(Page)`
  justify-content: center;
  align-items: center;

  & h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 736px) {
    & h1 {
      font-size: 3rem;
    }
  }
`;

export function Home() {
  return (
    <StyledHome>
      <h1 className="text-center">Welcome to my page.</h1>
      <p className="text-center">
        It isn&apos;t ready yet, so in the mean time why don&apos;t you check
        out my <Link to="/blog">blog</Link>?
      </p>
    </StyledHome>
  );
}
