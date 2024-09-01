import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../action/userActions';
import { openModal } from '../action/modalAction'; // Import openModal action

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userSignup = useSelector(state => state.userSignup);
  const { loading, error, userInfo } = userSignup;

  const submitSignUp = (e) => {
    e.preventDefault();
    dispatch(signup(email, password))
      .then(() => {
        // Open the login modal on successful signup
        dispatch(openModal("open", "USER CREATED SUCCESSFULLY...PLEASE GO TO LOGIN"));
      })
      .catch(err => {
        console.error("Signup error:", err);
      });
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      <form onSubmit={submitSignUp}>
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
        <button type="submit" className="sign-up-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;




