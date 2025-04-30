// src/components/AddProduct.js
// Test Change
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: true
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'A valid, non-negative price is required.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    // POST new product to the backend
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Redirect back to the product list after adding
        navigate('/products');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          {errors.name && <span style={{ color: 'red' }}> {errors.name}</span>}
        </div>
        <div>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          {errors.description && <span style={{ color: 'red' }}> {errors.description}</span>}
        </div>
        <div>
          <label>
            Price:
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
          </label>
          {errors.price && <span style={{ color: 'red' }}> {errors.price}</span>}
        </div>
        <div>
          <label>
            Available:
            <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
