import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../images/login-logo.png";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) navigate("/", { replace: true });
      })
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to={"/"}>
        <img className="login-logo" src={logo} alt="logo" />
      </Link>
      <div className="login-container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-signInBtn" onClick={signIn}>
            sign in
          </button>
          <p>
            By Continue You Agree With Amazon's Fake Clone Conditions of Use and
            Privacy Notice.
          </p>
          <button className="login-registerBtn" onClick={register}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
