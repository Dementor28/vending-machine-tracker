// src/components/ProductCard.js
import React from 'react';

function ProductCard({ product, onDelete, onBuy }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Stock: {product.stock}</p>
        
        {/* Stock warning */}
        {product.stock < 3 && (
          <div className="alert alert-warning" role="alert">
            Low stock warning!
          </div>
        )}
        
        <button className="btn btn-warning">Update</button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
          Delete
        </button>
        <button className="btn btn-success" onClick={() => onBuy(product.id)}>
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
