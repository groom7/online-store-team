import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmptyCart from './EmptyCart';

test('renders empty cart elements', () => {
  render(
    <BrowserRouter>
      <EmptyCart />
    </BrowserRouter>
  );
  const spanElement = screen.getByText(/You don't have any items in your cart. Let's get shopping!/i);
  const startShoppingLink = screen.getByRole('link');
  expect(spanElement).toBeInTheDocument();
  expect(startShoppingLink).toBeInTheDocument();
});
