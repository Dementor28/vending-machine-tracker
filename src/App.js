import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = (newProduct) => {
    axios.post('http://localhost:5000/api/products', newProduct)
      .then(response => setProducts([...products, response.data]))
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleBuyProduct = (id) => {
    // Update sales and stock for the product
    axios.patch(`http://localhost:5000/api/products/${id}`, { sales: 1, stock: -1 })
      .then(response => {
        setProducts(products.map(product => 
          product.id === id ? response.data : product
        ));
      })
      .catch(error => console.error('Error buying product:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Vending Machine Tracker</h1>
      <AddProductForm onAdd={handleAddProduct} />
      <div className="row mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onBuy={handleBuyProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
