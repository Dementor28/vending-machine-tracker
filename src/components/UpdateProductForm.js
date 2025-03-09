import React, { useState } from "react";

function UpdateProductForm({ product, onUpdate, onClose }) {
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
        price: parseFloat(price), // Ensure price is a number
        stock: parseInt(stock, 10),
      };
    onUpdate(product._id, updatedData);
    onClose(); // Close modal after update
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock:</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductForm;
