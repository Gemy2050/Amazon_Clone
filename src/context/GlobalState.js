import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";
import { auth } from "../firebase";

const GlobalContext = createContext(null);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ basket: state.basket, user: state.user, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

export const useAuth = () => {
  return useContext(GlobalContext);
};

export const getTotalPrice = (basket) => {
  return basket.reduce((amount, item) => {
    return amount + item?.price;
  }, 0);
};

export const formatCurrency = (price) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
};
