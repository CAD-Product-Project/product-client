// src/components/ProductList.test.js
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

// A simple test case that checks if the component renders the heading
test('renders Product List heading', () => {
  render(<ProductList />);
  const headingElement = screen.getByText(/Product List/i);
  expect(headingElement).toBeInTheDocument();
});
