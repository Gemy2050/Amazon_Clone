import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/header-logo.png";
import searchIcon from "../images/searchIcon.png";
import cart from "../images/shopping-cart.png";
import { useAuth } from "../context/GlobalState";
import { auth } from "../firebase";

function Header() {
  let { user, basket } = useAuth();

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logo" src={logo} alt="Logo" />
      </Link>
      <div className="header-search">
        <input className="header-searchInput" type="text" />
        <img className="header-searchIcon" src={searchIcon} alt="search" />
      </div>
      <div className="header-nav">
        <Link to={!user && "/login"}>
          <div className="header-option" onClick={signOut}>
            <div className="header-optionLineOne">
              Hello {user ? user.email : "Guest"}
            </div>
            <div className="header-optionLineTwo">
              {" "}
              {user ? "Sign out" : "Sign In"}
            </div>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header-option">
            <div className="header-optionLineOne">Returns &</div>
            <div className="header-optionLineTwo">Orders</div>
          </div>
        </Link>
        <div className="header-option">
          <div className="header-optionLineOne">Your</div>
          <div className="header-optionLineTwo">Prime</div>
        </div>
        <Link to="/checkout">
          <div className="header-optionBasket">
            <img src={cart} alt="cart" />
            <span className="header-optionLineTwo header-basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
