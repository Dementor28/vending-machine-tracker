import React from "react";

function ProductCard({ product, onDelete, onBuy }) {
  const revenue = product.sales * product.price; // Calculate revenue
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(revenue);

  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">Price: ${product.price.toFixed(2)}</p>
        <p className="card-text">Stock: {product.stock}</p>
        <p className="card-text">Sales: {product.sales}</p>
        <p className="card-text">Revenue: {formattedRevenue}</p>

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

        <div className="mt-2">
          <button className="btn btn-danger" onClick={() => onDelete(product._id)}>
            Delete
          </button>
          <button
            className="btn btn-success ms-2"
            onClick={() => onBuy(product._id)}
            disabled={product.stock <= 0}
          >
            Buy
          </button>

          <button
            className="btn btn-primary ms-2"
            onClick={() => setIsUpdating(true)}
          >
            Update
          </button>


        </div>
      </div>
    </div>
  );
}

export default ProductCard;
