import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native'; // eslint-disable-line import/no-extraneous-dependencies
import App from './App.tsx'; // eslint-disable-line import/extensions

it('renders correctly', () => {
  const component = render(<App />);
  expect(component).toBeDefined();
});
