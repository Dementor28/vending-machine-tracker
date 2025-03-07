import React from "react";

function ProductCard({ product, onDelete, onBuy }) {
  const revenue = product.sales * product.price; // Calculate the revenue

  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Stock: {product.stock}</p>
        <p className="card-text">Sales: {product.sales}</p>{" "}
        {/* Show sales count */}
        <p className="card-text">Revenue: ${revenue.toFixed(2)}</p>{" "}
        {/* Show revenue */}
        {/* Stock warning */}
        {product.stock === 0 ? (
          <div className="alert alert-danger" role="alert">
            Product is out of stock!
          </div>
        ) : product.stock < 3 ? (
          <div className="alert alert-warning" role="alert">
            Low stock warning!
          </div>
        ) : null}
        <button
          className="btn btn-danger"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => onBuy(product._id)}
          disabled={product.stock <= 0}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
