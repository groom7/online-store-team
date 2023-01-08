import { render, screen, fireEvent  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundComponent from './NotFoundComponent';

test('renders header element', () => {
  render(
    <BrowserRouter>
      <NotFoundComponent />
    </BrowserRouter>
  );
  const startShoppingButton = screen.getByTestId('start-shopping-button');
  expect(startShoppingButton).toBeInTheDocument();
});
