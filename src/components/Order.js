import moment from "moment";
import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import { formatCurrency, getTotalPrice } from "../context/GlobalState";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>
        Date: {moment.unix(order.data.created).format("DD MMMM YYYY - hh:mm a")}
      </p>
      <p className="order-id">
        <small>ID: {order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct key={item.id} product={item} hiddenBtn={true} />
      ))}
      <p className="order-total">
        Total: {formatCurrency(getTotalPrice(order.data.basket))}
      </p>
    </div>
  );
}

export default Order;
