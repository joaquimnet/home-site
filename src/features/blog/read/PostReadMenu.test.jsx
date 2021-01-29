import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const routed = (a) => (
  // eslint-disable-next-line react/no-children-prop
  <Router history={createMemoryHistory()} children={a} />
);

import { PostReadMenu } from './PostReadMenu';

describe('<PostReadMenu>', () => {
  it('should render', () => {
    const { baseElement } = render(
      routed(<PostReadMenu post={{ slug: 'hello' }} />),
    );
    expect(document.body.contains(baseElement));
  });

  it('should render 1 button and 1 link', () => {
    const { getAllByRole } = render(
      routed(<PostReadMenu post={{ slug: 'hello' }} />),
    );
    expect(getAllByRole('button').length).to.equal(1);
    expect(getAllByRole('link').length).to.equal(1);
  });

  it('should have slug in edit link', () => {
    const slug = 'how-to-setup-vscode-for-javascript-123456789';
    const { getByRole } = render(routed(<PostReadMenu post={{ slug }} />));
    expect(getByRole('link').getAttribute('href')).to.contain(slug);
  });
});
