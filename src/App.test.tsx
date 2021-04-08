import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Form from './components/Form';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/next/i);
  expect(linkElement).toBeInTheDocument();
});
