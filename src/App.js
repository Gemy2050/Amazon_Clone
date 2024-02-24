import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import LoginAuth from "./components/LoginAuth";
import Orders from "./components/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51Omg7JJP2m86Vh2GxjbyKL6M67XUFQegjl8CdCRmPPpw5Sot2RtK7EU2OMH0VuOB4BFARjmNGb2HxCrcm8yVXRbU00i1sJQyU2"
  );
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <LoginAuth>
              <Login />
            </LoginAuth>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
