import { render, screen, fireEvent  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('footer redirect links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const cartPageLink = screen.getByTestId('header__cart');
    expect(cartPageLink).toBeInTheDocument();
});
