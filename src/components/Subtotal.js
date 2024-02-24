import { formatCurrency, useAuth } from "../context/GlobalState";
import { getTotalPrice } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  let { basket } = useAuth();

  return (
    <div className="subtotal">
      <p className="text-center">
        Subtotal: ({basket.length} items)
        <strong> {formatCurrency(getTotalPrice(basket))}</strong>
      </p>
      <small className="subtotal_gift">
        <input type="checkbox" id="gift" />
        <label htmlFor="gift">this order contains a gift</label>
      </small>
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
