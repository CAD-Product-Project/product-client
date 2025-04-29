// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3000/products')  // Ensure your Rails server is running and accepts JSON.
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Filter products by availability if the filter is set to 'available'
  const filteredProducts =
    filter === 'available'
      ? products.filter(product => product.available)
      : products;

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <button onClick={() => setFilter('all')}>Show All</button>
        <button onClick={() => setFilter('available')}>Show Available</button>
      </div>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name} - ${product.price} - Available: {String(product.available)}
            </Link>
            {/* Delete functionality: Clicking the Delete button will remove the product */}
            <button onClick={() => {
              fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'DELETE',
              })
              .then(() => {
                // Remove the deleted product from the local state
                setProducts(products.filter(p => p.id !== product.id));
              });
            }}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/products/new">Add New Product</Link>
    </div>
  );
}

export default ProductList;
