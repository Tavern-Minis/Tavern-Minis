import React from "react";
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";

/**
 * COMPONENT
 */
export const SingleProductInList = (props) => {
  const { product } = props;
  let clickCooldown = false;
  return (
    <div className="column">
      <Link to={`/products/${product.id}`}>
        <img className="all-product-view-thumbnail" src={product.imgURL} />
        <div className="product-title">
          {product.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}
        </div>
        <div className="row">
          <div className="product-spec">
            ${(product.price * 0.01).toFixed(2)}
          </div>
          <div className="product-spec">
            {(product.rating * 0.1).toFixed(1)} / 5
          </div>
        </div>
      </Link>
      <AddToCart product={product.id}/>
    </div>
  );
};
