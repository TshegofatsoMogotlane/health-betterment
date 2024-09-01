import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../action/userActions'; // Import signup action
import "./Login.css";
import { openModal } from '../action/modalAction';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup
  const [name, setName] = useState(""); // Additional state for signup

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(openModal("closed", ""));
      
      // Setting up authorization header with the access token
      if (userInfo && userInfo.accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Example: You can make authenticated requests here if needed
        console.log("Access Token:", userInfo.accessToken);
        // You can use the config object to make authenticated requests here if needed
      }
    }
  }, [dispatch, userInfo]);

  const submitForm = (e) => {
    e.preventDefault(); // Prevent the browser from refreshing after submitting the form

    if (isSignup) {
      dispatch(signup(name, email, password)); // Call signup action
    } else {
      dispatch(login(email, password)); // Call login action
    }
  };

  return (
    <div className="login-form">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      <form onSubmit={submitForm}>
        <button type="button" className="facebook-login">Connect with Facebook</button>
        <button type="button" className="google-login">Connect with Google</button>
        <div className="login-or center">
          <span>or</span>
          <div className="or-divider"></div>
        </div>
        {isSignup && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="browser-default"
            placeholder="Full Name"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="browser-default"
          placeholder="Email Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="browser-default"
          placeholder="Password"
        />
        <button type="submit" className="sign-up-button">{isSignup ? "Sign Up" : "Login"}</button>
        <div className="divider"></div>
        <div onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </div>
      </form>
    </div>
  );
};

export default Login;

