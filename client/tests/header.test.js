import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/header';

describe('Header Component Test', () => {
  it('snapshot renders', () => {
    const component = renderer.create(
      <Router>
        <Header />
      </Router>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
