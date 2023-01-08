import { render, screen, fireEvent  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

test('renders header element', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const githubLink = screen.getByTestId('github-block');
  expect(githubLink).toBeInTheDocument();
});
