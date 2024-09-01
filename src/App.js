// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import BookingPage from "./components/BookingPage"; // Import BookingPage
import Modal from "./components/Modal";
import { useSelector } from 'react-redux';

function App() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Protected Route Component
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <ProtectedRoute path="/booking/:id" exact component={BookingPage} />
        {/* Optionally handle 404 page */}
        <Route>
          <div>404 Not Found</div>
        </Route>
      </Switch>
      <Footer />
      {/* Modal rendering conditionally (e.g., based on state) */}
      <Modal />
    </Router>
  );
}

export default App;




