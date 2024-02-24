import checkoutImg from "../images/checkoutAd.jpg";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const { user, basket } = useAuth();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={checkoutImg} alt="checkout-ad" />
        <div className="shopping">
          <h3>Hello {user ? user.email : "Guest"},</h3>
          <h2 className="checkout-title">Your Shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item, i) => <CheckoutProduct key={i} product={item} />)
          ) : (
            <h4 className="basket-message">
              There is no items in your shopping basket.
            </h4>
          )}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
