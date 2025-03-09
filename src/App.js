import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);

    // Function to show an alert message
    const showAlert = (message, duration = 2000) => {
      setAlert(message);
      setTimeout(() => setAlert(null), duration); // Auto-hide alert after duration
    };

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = (newProduct) => {
    axios.post("http://localhost:5000/api/products", newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        showAlert("Product added successfully!", 2000);
      })
      .catch(error => console.error("Error adding product:", error));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
        showAlert("Product deleted successfully!", 2000);
      })
      .catch(error => console.error("Error deleting product:", error));
  };

  const handleBuyProduct = (id) => {
    console.log("Buying product with ID:", id); // Debugging line
    // Update sales and stock for the product
    axios.patch(`http://localhost:5000/api/products/${id}`, {})
      .then(response => {
        setProducts(products.map(product => 
          product._id === id ? response.data : product
        ));
        showAlert("Purchase successful!", 900); // Quick 0.5s pop-up
      })
      .catch(error => console.error('Error buying product:', error));
  };

  const handleUpdateProduct = (id, updatedData) => {
    console.log("Updating product with ID:", id); // Debugging line
    axios
      .put(`http://localhost:5000/api/products/${id}`, updatedData)
      .then((response) => {
        const updatedProduct = response.data;
        
        if (!updatedProduct.price || isNaN(updatedProduct.price)) {
          console.error("Invalid price received:", updatedProduct.price);
          return;
        }
  
        setProducts(products.map((product) =>
          product._id === id ? updatedProduct : product
        ));
        showAlert("Product updated successfully!", 2000);
      })
      .catch((error) => {
        console.error("Error updating product:", error.response?.data || error);
      });
  };

  return (
    <div className="container mt-5">

{alert && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x">
          {alert}
        </div>
      )}

      <h1 className="text-primary">Vending Machine Tracker</h1>
      <AddProductForm onAdd={handleAddProduct} />
      <div className="row mt-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onBuy={handleBuyProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
