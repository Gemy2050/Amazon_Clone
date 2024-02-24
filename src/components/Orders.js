import React, { useEffect, useState } from "react";
import Order from "./Order";
import { useAuth } from "../context/GlobalState";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const collectionRef = collection(db, "users", `${user?.uid}`, "orders");
      const orderedRef = query(collectionRef, orderBy("created", "desc"));
      onSnapshot(orderedRef, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
