import React from "react";
import starImage from "../images/star.png";
import { useAuth } from "../context/GlobalState";

function CheckoutProduct({ product, hiddenBtn }) {
  let { id, image, title, price, rating } = product;
  const { dispatch } = useAuth();

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id: id });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} alt="product" />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>
                <img src={starImage} alt="star" />
              </p>
            ))}
        </div>
        {!hiddenBtn && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
