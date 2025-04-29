import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* Optionally, define a default route */}
          <Route path="*" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
