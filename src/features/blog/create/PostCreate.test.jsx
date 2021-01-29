import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const routed = (a) => (
  // eslint-disable-next-line react/no-children-prop
  <Router history={createMemoryHistory()} children={a} />
);

import { PostCreate } from './PostCreate';

describe('<PostCreate>', () => {
  it('should render', () => {
    const { baseElement } = render(routed(<PostCreate />));
    expect(document.body.contains(baseElement));
  });
});
