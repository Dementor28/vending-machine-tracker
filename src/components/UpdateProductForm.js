import React, { useState} from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

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
    <ModalOverlay>
      <ModalContent>
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
      </ModalContent>
    </ModalOverlay>
  );
}

export default UpdateProductForm;