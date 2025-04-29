// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Available:</strong> {String(product.available)}</p>
      <Link to={`/products/${product.id}/edit`}>Edit Product</Link>
      <br />
      <Link to="/products">Back to List</Link>
    </div>
  );
}

export default ProductDetails;
