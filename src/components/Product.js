import { useAuth } from "../context/GlobalState";
import starIcon from "../images/star.png";

function Product({ id, image, title, price, rating }) {
  let { dispatch } = useAuth();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, image, title, price, rating },
    });
  };

  return (
    <div className="product" id={id}>
      <div className="product-info">
        <p className="title">{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product-rating">
        <p>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <img
                key={i}
                className="start-icon"
                src={starIcon}
                alt="Star Icon"
              />
            ))}
        </p>
      </div>
      <img src={image} alt="product" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
