import React from 'react';
import { render } from '@testing-library/react';
import BlogHome from './Blog/BlogHome';
import Header from './Blog/partial/Header';

test('renders header title', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Sam's TechBlog/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header subtitle', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Bienvenue sur mon site web ! Ici vous trouverez mes articles, projets et plein d'autres choses ! :\)/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header subtitle', () => {
  const { getByText } = render(<BlogHome />);
  const linkElement = getByText(/Articles/i);
  expect(linkElement).toBeInTheDocument();
});