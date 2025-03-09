import React, { useState } from "react";
import UpdateProductForm from "./UpdateProductForm";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const Stock = styled.p`
  font-size: 14px;
  color: ${(props) => (props.lowStock ? "red" : "#555")};
`;

const Button = styled.button`
  background: ${(props) => (props.$danger ? "#dc3545" : "#28a745")};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.$danger ? "#c82333" : "#218838")};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Alert = styled.div`
  background: ${(props) => (props.$outOfStock ? "#ff4d4d" : "#ffcc00")};
  color: ${(props) => (props.$outOfStock ? "white" : "black")};
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

function ProductCard({ product, onDelete, onBuy, onUpdate }) {
  const revenue = product.sales * product.price; // Calculate revenue
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(revenue);

  const [isUpdating, setIsUpdating] = useState(false);
  const price = !isNaN(Number(product.price)) ? Number(product.price) : 0; // Default to 0 if price is missing

  return (
    <Card>
      <Title>{product.name}</Title>
      <Price>${price.toFixed(2)}</Price>
      <Stock>{product.stock}</Stock>
      <p>Sales: {product.sales}</p>
      <p>Revenue: {formattedRevenue}</p>

      {/* Stock warning */}
      {product.stock === 0 ? (
        <Alert outofstock>Product is out of stock!</Alert>
      ) : product.stock < 3 ? (
        <Alert>Low stock warning!</Alert>
      ) : null}

      <Button $danger onClick={() => onDelete(product._id)}>Delete</Button>
      <Button onClick={() => onBuy(product._id)} disabled={product.stock <= 0}>Buy</Button>
      <Button onClick={() => setIsUpdating(true)}>Update</Button>

      {/* Show Update Form Modal */}
      {isUpdating && (
        <UpdateProductForm
          product={product}
          onUpdate={onUpdate}
          onClose={() => setIsUpdating(false)}
        />
      )}
    </Card>
  );
}

export default ProductCard;
