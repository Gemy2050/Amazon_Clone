import { Link, useNavigate } from "react-router-dom";
import { formatCurrency, getTotalPrice, useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "./axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Payment() {
  const { basket, user, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getTotalPrice(basket) * 100}`, // For Fractions (cent => dollar) because in stripe take amount in cents
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const docRef = doc(
          db,
          "users",
          `${user?.uid}`,
          "orders",
          `${paymentIntent.id}`
        );
        setDoc(docRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setProcessing(false);
        setSucceeded(true);
        setError(null);
        navigate("/orders", { replace: true });
        dispatch({ type: "EMPTY_BASKET" });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} Items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address:</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Cairo, Egypt</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery:</h3>
          </div>
          <div className="payment-items">
            {basket.map((item, i) => (
              <CheckoutProduct key={i} product={item} />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <h3>Payment Method:</h3>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <h3>Order Total: {formatCurrency(getTotalPrice(basket))}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
